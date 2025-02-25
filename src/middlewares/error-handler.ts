import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  response.status(500).json({
    status: 'error',
    message: error.message || 'Internal server error'
  });

  return;
};