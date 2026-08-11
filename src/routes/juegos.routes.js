import { Router } from "express";

import {
  obtenerWordleCapital,
} from "../controllers/wordle capital/juego.controllers.js";

import {
  obtenerWordlePais,
} from "../controllers/wordle pais/juego.controllers.js";

const router = Router();

router.get("/encontra-la-capital", obtenerWordleCapital);

router.get("/encontra-el-pais", obtenerWordlePais);

export default router;