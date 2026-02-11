import { Router } from "express";
import dropRoutes from "./modules/drops/drops.routes";

const router = Router();

router.use('/drops', dropRoutes);

export default router;