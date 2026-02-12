import { Router } from "express";
import { handleGetReservations, handleReservation } from "./reservation.controller";


const router = Router()

router.get("/", handleGetReservations)
router.post("/:user_id/:drop_id", handleReservation)

export default router