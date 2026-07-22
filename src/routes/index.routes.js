import { Router } from "express";
import paisesRoutes from "./paises.routes.js";

const router = Router();

router.use("/paises", paisesRoutes);

export default router;
