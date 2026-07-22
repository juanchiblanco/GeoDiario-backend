import { Router } from "express";
import paisesRoutes from "./paises.routes.js";
import juegosRoutes from "./juegos.routes.js";

const router = Router();

router.use("/paises", paisesRoutes);
router.use("/juegos", juegosRoutes);

export default router;
