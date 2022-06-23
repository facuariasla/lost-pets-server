import { Router } from "express";
import { authMiddleware } from "../controllers/auth.controllers";
import * as path from "path";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  getUserPets,
  userLogin,
  meFn,
} from "../controllers/users.controllers";
const router = Router();

// CAMBIAR LA RUTA RELATIVA tanto de dist como el html?
// const rutaRelativa = path.resolve(__dirname, "../../dist/", "index.html");
// const staticDirPath = path.resolve(__dirname, "../client");

// Rutas con middleWare necesitan bearer token en headers en la peticion
router.get("/users", getAllUsers);
router.post("/users", createUser);
//Endpoint que CREA y devuelve el TOKEN
router.post("/users/login", userLogin);
//Necesita TOKEN en headers:
router.put("/users/:id", authMiddleware, updateUser);
//Necesita TOKEN en headers:
router.delete("/users/:id", authMiddleware, deleteUser);
router.get("/users/:id", getUser);

// Llama a todos los pets de determinado user
router.get("/users/:id/pets", authMiddleware, getUserPets);

// Da info del usuario actual
router.get("/me", authMiddleware, meFn)


// router.get("*", (req, res) => {
//   res.sendFile(`${rutaRelativa}`);
// });

export default router;
