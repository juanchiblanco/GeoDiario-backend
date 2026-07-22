import { Router } from "express";
import {
  obtenerPaises,
  obtenerPaisPorId,
} from "../controllers/pais.controllers.js";

const router = Router();

router.get("/", obtenerPaises);

export default router;
