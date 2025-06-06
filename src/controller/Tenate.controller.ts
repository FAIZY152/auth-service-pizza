import { Request, Response, NextFunction } from 'express';
import { AddTenate } from '../services/Tenate.service';
import { TenateRequest } from '../types';
import Logger from '../config/Logger';
import { validationResult } from 'express-validator';

export const createTenate = async (
  req: TenateRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { name, address } = req.body;
    const tenate = await AddTenate({ name, address });
    Logger.info('Creating Tenate', {
      name,
      address,
    });
    if (!tenate) {
      Logger.error('Failed to create Tenate');
      return res.status(500).json({ message: 'Failed to create Tenate' });
    }
    Logger.info('Tenate created successfully', {
      tenateId: tenate.id,
    });
    res.status(201).json({
      message: 'Tenate created successfully',
      id: tenate.id,
    });
  } catch (error) {
    Logger.error('Error creating Tenate', error);
    next(error);
  }
};
