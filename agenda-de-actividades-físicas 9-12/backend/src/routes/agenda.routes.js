import { Router } from "express";
import { getActividades, crearActividad } from "../controllers/agenda.controllers.js";

const router = Router();

router.get("/", getActividades);
router.post("/", crearActividad);

export default router;
