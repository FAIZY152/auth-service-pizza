import { Request, Response, NextFunction } from 'express';
import {
  AddTenate,
  DeleteT,
  getAll,
  GetById,
  GetTenates,
  Update,
} from '../services/Tenate.service';
import { TenantQueryParams, TenateRequest } from '../types';
import Logger from '../config/Logger';
import { matchedData, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

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

export const getTenates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validatedQuery = matchedData(req, { onlyValidData: true });

  try {
    const [tenants, count] = await getAll(validatedQuery as TenantQueryParams);

    Logger.info('All tenant have been fetched');
    res.json({
      currentPage: validatedQuery.currentPage as number,
      perPage: validatedQuery.perPage as number,
      total: count,
      data: tenants,
    });

    res.json(tenants);
  } catch (err) {
    next(err);
  }
};

export const getTenateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tenantId = req.params.id;

  if (isNaN(Number(tenantId))) {
    next(createHttpError(400, 'Invalid url param.'));
    return;
  }

  try {
    const tenant = await GetById(Number(tenantId));

    if (!tenant) {
      next(createHttpError(400, 'Tenant does not exist.'));
      return;
    }

    Logger.info('Tenant has been fetched');
    res.json(tenant);
  } catch (err) {
    next(err);
  }
};

export const updateTenate = async (
  req: TenateRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // Validation
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { name, address } = req.body;
  const tenantId = req.params.id;

  if (isNaN(Number(tenantId))) {
    next(createHttpError(400, 'Invalid url param.'));
    return;
  }

  Logger.debug('Request for updating a tenant', req.body);

  try {
    await Update(Number(tenantId), {
      name,
      address,
    });

    Logger.info('Tenant has been updated', { id: tenantId });

    res.json({ id: Number(tenantId) });
  } catch (err) {
    next(err);
  }
};

export const deleteTenate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tenantId = req.params.id;

  if (isNaN(Number(tenantId))) {
    next(createHttpError(400, 'Invalid url param.'));
    return;
  }

  try {
    await DeleteT(Number(tenantId));
    Logger.info('Tenant has been deleted', { id: tenantId });
    res.status(204).send({
      message: 'Tenant deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
