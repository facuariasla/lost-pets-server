// hello_algolia.js
import algoliasearch from "algoliasearch";
import "dotenv/config";
import type { PetALG, UserALG } from "../../Types";

// Connect and authenticate with your Algolia app
const client = algoliasearch("K2HBI0ODPX", process.env.ALGOLIA_API_KEY);

// Create a new index
const pets_algolia = client.initIndex("pets");
const users_algolia = client.initIndex("users");

// PETS QUERIES //////////////////////////////////////////////////////////////
export const newPet_ALG = async (record: any) => {
  try {
    const newPet = await pets_algolia.saveObject(record).wait();
    console.log(newPet);
    return newPet;
  } catch (error) {
    console.log({ algoliaErr: error });
    return error;
  }
};

export const delPet_ALG = async (petId: string) => {
  try {
    const petDeleted = await pets_algolia.deleteObject(petId);
    console.log(petDeleted);
    return petDeleted;
  } catch (error) {
    console.log({ algoliaErr: error });
    return error;
  }
};

export const petsAround_ALG = async (lat: number, lng: number) => {
  try {
    const { hits } = await pets_algolia.search("", {
      aroundLatLng: [lat, lng].join(","),
      aroundRadius: 1000, // expresado en metros
    });
    return hits;
  } catch (error) {
    console.log({ algoliaErr: error });
    return error;
  }
};

export const petUpdate_ALG = async (data: PetALG) => {
  try {
    const objectID = await pets_algolia.partialUpdateObject(data);
    console.log(objectID);
    return objectID;
  } catch (error) {
    console.log({ algoliaErr: error });
    return error;
  }
};
