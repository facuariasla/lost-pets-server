import { Router } from "express";
import { authMiddleware } from "../controllers/auth.controllers";
import {
  createPet,
  deletePet,
  getAllLOSTPets,
  getAllPets,
  getPet,
  getPetsLOSTAround,
  reportPet,
  updatePet,
} from "../controllers/pets.controllers";
const router = Router();

router.get("/pets", getAllPets);
router.get("/lostpets", getAllLOSTPets);
// REVISAR COMO AGREGAR lat y lng:
router.get("/pets-around", getPetsLOSTAround);

router.get("/pets/:objectID", getPet);
router.post("/pets/:objectID/report", reportPet);

router.post("/pets", authMiddleware, createPet);
router.put("/pets/:objectID", authMiddleware, updatePet);
router.delete("/pets/:objectID", authMiddleware, deletePet);

export default router;
