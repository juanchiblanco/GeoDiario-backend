import { Router } from "express";

import { obtenerWordleCapital } from "../controllers/wordle capital/juego.controllers.js";

const router = Router();

router.get("/encontra-la-capital", obtenerWordleCapital);

export default router;
