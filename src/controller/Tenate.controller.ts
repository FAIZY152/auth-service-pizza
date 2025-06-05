import { Request, Response, NextFunction } from 'express';

export const createTenate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json({});
  } catch (error) {}
};
