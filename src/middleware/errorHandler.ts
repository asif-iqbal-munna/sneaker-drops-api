import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { sendError } from "../lib/apiResponse";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    console.log({err})
    const messages = err.issues.map((issue) => issue.message);
    return sendError(res, messages[0], "Validation failed", 400);
  }

  return sendError(res, err, "Internal server error");
};

