import { Router } from "express";
import { handlePurchase } from "./purchase.controller";

const router = Router()

router.post("/:user_id/:drop_id", handlePurchase)

export default router