import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../config/Logger';

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errorId = uuidv4();
  const statusCode = err.status || 500;

  const isProduction = process.env.NODE_ENV === 'production';
  /// todo: error message should be more user friendly if 400 then send to client
  let message = 'Internal server error';
  if (statusCode === 400) {
    message = err.message;
  }

  Logger.error(err.message, {
    id: errorId,
    statusCode,
    error: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    errors: [
      {
        ref: errorId,
        type: err.name,
        msg: message,
        path: req.path,
        method: req.method,
        location: 'server',
        stack: isProduction ? null : err.stack,
      },
    ],
  });
};
