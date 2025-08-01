import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../types';
import createHttpError from 'http-errors';

export const canAccess = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const roleFromToken = _req.auth?.role;

    if (!roleFromToken || !roles.includes(roleFromToken)) {
      return next(createHttpError(403, "You don't have enough permissions"));
    }

    next();
  };
};
