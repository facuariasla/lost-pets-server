import { User } from "../models/users";
import { Auth } from "../models/auths";
import { Pet } from "../models/pets";
import { sendMail } from "../lib/sendgrid";
import {
  delPet_ALG,
  newPet_ALG,
  petsAround_ALG,
  petUpdate_ALG,
} from "../lib/lib/algolia";
import { v4 as uuidv4 } from "uuid";
import { cloudinary } from "../lib/cloudinary";

export const getAllPets = async (req, res) => {
  try {
    const allPets = await Pet.findAll();
    res.status(200).json(allPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLOSTPets = async (req, res) => {
  try {
    const lostPets = await Pet.findAll({
      where: {
        lost: true,
      },
    });
    res.status(200).json(lostPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetsLOSTAround = async (req, res) => {
  const { lat, lng } = req.query;
  // En la peticion del front: fetch(`pets-around?lat=${lat}&lng=${lng}`)
  try {
    const closePetsALG = await petsAround_ALG(lat, lng);
    res.status(200).json(closePetsALG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    console.log(req._user);
    // El id es automatico, el userId (foreignKey) viene del token, y el lost true es default
    const { petname, description, petPhoto, lat, lng, location } = req.body;
    const objectID = uuidv4();
    if (petPhoto) {
      const imageRes = await cloudinary.uploader.upload(petPhoto, {
        resoruce_type: "image",
        discard_original_filename: true,
        width: 500,
      });

      const newPet = {
        petname,
        description,
        petPhoto: imageRes.secure_url,
        lat,
        lng,
        location,
        userId: req._user.id,
        objectID,
      };
      const newPetAlg = {
        petname,
        description,
        petPhoto: imageRes.secure_url,
        _geoloc: {
          lat,
          lng,
        },
        location,
        userId: req._user.id,
        objectID,
      };
      // newPet en Sequelize
      const pet = await Pet.create(newPet);
      // newPet en Algolia
      const petAlg = await newPet_ALG(newPetAlg);
      console.log(petname, "creado");
      res.status(200).json({ postgres: pet, algolia: petAlg });
    } else {
      res.json({
        message: "No hay imagen en el form - msg from pets.controllers",
      });
      console.log("No hay imagen en el form - msg from pets.controllers");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPet = async (req, res) => {
  try {
    const { objectID } = req.params;
    const pet = await Pet.findOne({
      where: {
        objectID
      }
    });
    
    if (!pet)
      return res
        .status(404)
        .json({ message: "The pet is literally lost in the database too" });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { objectID } = req.params;
    // const { id } = req.params;
    const { petname, description, petPhoto, location, lat, lng } = req.body;
    const userId = req._user.id;
    console.log(userId);

    if (petPhoto) {
      const imageRes = await cloudinary.uploader.upload(petPhoto, {
        resoruce_type: "image",
        discard_original_filename: true,
        width: 500,
      });

      const pet = await Pet.findOne({
        where: {
          objectID,
        },
      });

      pet.set({
        petname,
        description,
        lat,
        lng,
        petPhoto: imageRes.secure_url,
        location,
      });
      // DB Algolia:
      const updatePetALG = await petUpdate_ALG({
        objectID,
        petname,
        description,
        lat,
        lng,
        petPhoto: imageRes.secure_url,
        _geoloc:{
          lat,
          lng
        },
      });

      await pet.save();
      return res.status(200).json({ postgres: pet, algolia: updatePetALG });
    }

    // const pet = await Pet.findByPk(id);
  } catch (error) {
    console.log("Error en /pets.controller updatePet");
    res.status(401).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { objectID } = req.params;
    const userId = req._user.id;

    // ej objectID: '3ce8a3ae-c194-4649-a0c1-adb9e2ba3571'

    console.log({ user: userId, pet: objectID });
    const pet = await Pet.destroy({
      where: { objectID },
    });
    const delPetAlg = await delPet_ALG(objectID);
    console.log(`${pet} pet deleted`);
    return res
      .status(200)
      .json({ deleted: "deleted from postgres", algolia: delPetAlg });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// User SENDGRIND
export const reportPet = async (req, res) => {
  try {
    const { objectID } = req.params;
    const { firstname, phone, description, userId } = req.body;
    const pet = await Pet.findOne({
      where: {
        objectID,
      },
    });
    const owner = await User.findByPk(userId);

    console.log(req.body);
    const ownerEmail = await owner.get("email");
    const petName = await pet.get("petname");

    console.log(ownerEmail, petName);
    console.log(pet);

    // SENDGRID Crear funcion que envie un mail al user dueño del animal
    sendMail({
      to: `${ownerEmail}`,
      from: "infodev3410@gmail.com",
      subject: "Una de tus mascotas ha sido vista",
      html: `<strong>${firstname}</strong> ha visto a <strong>${petName}</strong>, tu mascota.<br>
      Descripción: "${description}"<br><br>
      <strong>${firstname}</strong> te dejó su número para quizás darte mas información: <strong><u>${phone}</u></strong>`,
    });

    res.status(200).json({
      success: "Email sent to the pet owner!",
      user: userId,
      pet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
