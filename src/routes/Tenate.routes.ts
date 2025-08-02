import express, { Router } from 'express';
import {
  createTenate,
  deleteTenate,
  getTenateById,
  getTenates,
  updateTenate,
} from '../controller/Tenate.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';
import { validateCreateTenate } from '../validators/Tenate-validator';
import { GetAllTenates } from '../services/Tenate.service';

const tenateRouter = express.Router();

tenateRouter.post(
  '/',
  isAuthenticate,
  canAccess([Roles.MANAGER, Roles.ADMIN]),
  validateCreateTenate,
  createTenate,
);
tenateRouter.patch(
  '/update/:id',
  isAuthenticate,
  canAccess([Roles.MANAGER, Roles.ADMIN]),
  validateCreateTenate,
  updateTenate,
);

tenateRouter.get(
  '/get-tenate/:id',
  isAuthenticate,
  canAccess([Roles.MANAGER, Roles.ADMIN]),
  getTenateById,
);
tenateRouter.get(
  '/get-tenate',
  isAuthenticate,
  canAccess([Roles.MANAGER, Roles.ADMIN]),
  getTenates,
);

tenateRouter.delete(
  '/delete-tenate/:id',
  isAuthenticate,
  canAccess([Roles.MANAGER, Roles.ADMIN]),
  deleteTenate,
);
export default tenateRouter;
