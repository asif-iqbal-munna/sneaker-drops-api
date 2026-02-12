import { RequestHandler } from "express";
import { createPurchase } from "./purchase.service";
import { sendError, sendSuccess } from "../../lib/apiResponse";

export const handlePurchase: RequestHandler = async (req, res) => {
  const { drop_id, user_id } = req.params;

  try {
    const purchase = await createPurchase(
      Number(user_id),
      Number(drop_id),
    );

    return sendSuccess(res, purchase, "purchase created successfully", 201);
  } catch (error: unknown) {
    return sendError(res, error, "Failed to create purchase");
  }
}