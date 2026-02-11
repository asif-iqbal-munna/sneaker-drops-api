import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodTypeAny, ZodError } from "zod";


export const validateReqBody = <T extends ZodTypeAny>(
  schema: T
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error as ZodError);
    }

    req.body = result.data;
    return next();
  };
};