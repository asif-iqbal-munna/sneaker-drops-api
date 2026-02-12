import { Router } from "express";
import { handleReservation } from "./reservation.controller";


const router = Router()

router.post("/:user_id/:drop_id", handleReservation)

export default router