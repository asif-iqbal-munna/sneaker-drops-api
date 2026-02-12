import { RequestHandler } from "express";
import { findAllUsers } from "./user.service";
import { sendError, sendSuccess } from "../../lib/apiResponse";


export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const drops = await findAllUsers();
    return sendSuccess(res, drops, "Users fetched successfully");
  } catch (error) {
    return sendError(res, error, "Failed to find users");
  }
};