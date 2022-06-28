import { User } from "../models/users";
import { Auth } from "../models/auths";
import { Pet } from "../models/pets";
import { getSHA256 } from "./auth.controllers";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { sendMail } from "../lib/sendgrid";

// Recordar usar Cloudinary, Dropzone
// SIGN IN
export const createUser = async (req, res) => {
  try {
    const { firstname, email, password, profilePic, userId } = req.body;

    if(password.length < 4){
      return 
    }

    const [newUser, created] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        firstname,
        email,
        profilePic,
      },
    });
    // Averiguar si existe otra manera de callear al userId
    // Se me hace que esta al borde de la sincronia (?)
    if (created) {
      const userId = newUser.get("id"); //Primary key de User
      const userAuth = await Auth.create({
        email,
        password: getSHA256(password),
        userId: userId, //Foreign key (from User)
      });
      const shhh = process.env.JSONWEBTOKEN_SHHH;
      const token = jwt.sign({ id: userId }, shhh);
      // Recordar guardar este valor en el localStorage en el state
      res.status(200).json({
        newUser,
        userAuth,
        token: token,
      });
      console.log(`User ${userId} created`);
    } else {
      res.status(203).json({ message: "This email is already registered" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User does not exist" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Usa middleware token (ver routes)
// Endpoint aun no se usa en el front
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, email, password, profilePic } = req.body;

    const user = await User.findByPk(id);

    const auth: any = await Auth.findOne({
      where: {
        userId: id,
      },
    });

    const emailExist: any = await Auth.findOne({
      where: {
        email,
      },
    });

    // Lo transformo a int, porque viene como string en params
    const idToNum = parseInt(id);
    if (emailExist !== null && emailExist.userId !== idToNum) {
      console.log("El email ingresado ya esta en uso");
      return res.json({
        exist: true,
        message: "El mail ingresado ya está en uso",
        idToNum,
        emailExist,
      });
    } else {
      auth.set({
        email,
      });
      user.set({
        firstname,
        email,
      });
      await user.save();
      await auth.save();
      return res.json({ success: true, user, auth: auth.email });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Usa middleware token (ver routes)
export const deleteUser = async (req, res) => {
  // ENVIAR CORREO DE CONFIRMACION PARA BORRAR
  try {
    const { id } = req.params;
    const result = await User.destroy({
      where: { id },
    });
    console.log(`User with id:${result} deleted`);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserPets = async (req, res) => {
  console.log(req._user);
  try {
    console.log(req._user);
    // const { id } = req.params;
    const userId_ = req._user.id;
    const userId = parseInt(userId_);
    const pets = await Pet.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(pets);
  } catch (error) {
    console.log(req._user);
    return res.status(500).json({ message: error.message });
  }
};

// ???
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN - Crea token
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = getSHA256(password);

    const auth = await Auth.findOne({
      where: {
        email,
        password: hashedPassword,
      },
    });

    if (auth) {
      const shhh = process.env.JSONWEBTOKEN_SHHH;
      const token = jwt.sign({ id: auth.get("userId") }, shhh);
      // Recordar guardar este valor en el localStorage en el state
      res.json({
        auth,
        token,
      });
    } else {
      res.status(400).json({ invalid: "email and password doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const changePass = async (req, res) => {
  try {
    const { id } = req.params;
    const { actualpass, newpass, newpass2 } = req.body;
    const actualpassHASHED = getSHA256(actualpass);

    // Lo transformo a int, porque viene como string en params
    const idToNum = parseInt(id);
    const auth: any = await Auth.findOne({
      where: {
        userId: idToNum,
      },
    });


    if (auth.password === actualpassHASHED) {
      if (newpass === newpass2) {
        auth.set({
          password: getSHA256(newpass),
        });
        await auth.save();

        sendMail({
          to: `${auth.email}`,
          from: "infodev3410@gmail.com",
          subject: "Contraseña cambiada",
          html: `Tu contraseña de <a href='https://mascotasperdidas-iota.vercel.app/'>Mascotas Perdidas</a> ha sido cambiada. Tu nueva contraseña es: ${newpass}`,
        });

        return res.json({ success: true, auth });

      }
      console.log("La nueva contraseña no coincide");
      return res.json({
        success: false,
        message: "La nueva contraseña no coincide",
        auth,
      });
    }
    console.log("La contraseña actual ingresada no es correcta");
    // Enviar correo de que la contraseña fue cambiada
    return res.json({
      success: false,
      message: "La nueva contraseña no coincide",
      auth,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU2MzkwNTQ2fQ.0BhUW-CHz9r7lXCALvZvXw-yyLsqxWrX52eu_MnAokM

// Llama a la informacion de determinado usuario (tiene middleware en routes)
export const meFn = async (req, res) => {
  try {
    console.log(req._user);
    const user = await User.findByPk(req._user.id);
    res.json(user);
  } catch (error) {
    console.log("Error en /user.controller meFn");
    return res.status(500).json({ message: error.message });
  }
};
