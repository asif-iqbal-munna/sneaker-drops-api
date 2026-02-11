import { RequestHandler } from "express";
import { createDrop, findDrops } from "./drops.service";
import { sendSuccess, sendError } from "../../lib/apiResponse";
import { DropCreationDto } from "./drops.interface";

export const getDrops: RequestHandler = async (_req, res) => {
  try {
    const drops = await findDrops();
    return sendSuccess(res, drops, "Drops fetched successfully");
  } catch (error) {
    return sendError(res, error, "Failed to find drops");
  }
};

export const handleCreateDrop: RequestHandler = async (req, res) => {
  const { name, price, total_stock, drops_date, status } = req.body;

  try {
    const drop = await createDrop({
      name,
      price,
      total_stock,
      drops_date,
      status
    } as DropCreationDto);

    return sendSuccess(res, drop, "Drop created successfully", 201);
  } catch (error: unknown) {
    return sendError(res, error, "Failed to create drop");
  }
};
