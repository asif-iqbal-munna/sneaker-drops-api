import { Router } from "express";
import dropRoutes from "./modules/drops/drops.routes";
import userRoutes from "./modules/user/user.routes"
import reservationRoutes from "./modules/reservation/reservation.routes"

const router = Router();

router.use('/drops', dropRoutes);
router.use("/users", userRoutes)
router.use("/reservations", reservationRoutes)

export default router;