import type { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | string[] | null;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'OK',
  statusCode = 200
) => {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data
  };

  return res.status(statusCode).json(body);
};

export const sendError = (
  res: Response,
  error: unknown,
  message = 'Request failed',
  statusCode = 500
) => {
  let errorMessage: string | null = null;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const body: ApiResponse<null> = {
    success: false,
    message,
    error: errorMessage
  };

  return res.status(statusCode).json(body);
};

