import { RequestHandler } from "express";
import { createReservation } from "./reservation.service";
import { sendError, sendSuccess } from "../../lib/apiResponse";

export const handleReservation: RequestHandler = async (req, res) => {
  const { drop_id, user_id } = req.params;

  try {
    const drop = await createReservation(
      Number(user_id),
      Number(drop_id),
    );

    return sendSuccess(res, drop, "reservation created successfully", 201);
  } catch (error: unknown) {
    return sendError(res, error, "Failed to create reservation");
  }
}