import { Router } from "express";
import { authMiddleware, getUserAuth } from "../controllers/auth.controllers";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  getUserPets,
  userLogin,
  meFn,
  changePass,
} from "../controllers/users.controllers";
const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
//Endpoint que CREA y devuelve el TOKEN
router.post("/users/login", userLogin);
//Necesita TOKEN en headers:
router.put("/users/:id", authMiddleware, updateUser);
//Necesita TOKEN en headers:
router.delete("/users/:id", authMiddleware, deleteUser);
router.get("/users/:id", getUser);

router.get("/users/:id/pets", authMiddleware, getUserPets);

router.get("/me", authMiddleware, meFn);

router.get("/user-auth", authMiddleware, getUserAuth);

router.put("/changepassword/:id", authMiddleware, changePass);

export default router;
