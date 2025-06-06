import express from 'express';
import { createTenate } from '../controller/Tenate.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';
import { validateCreateTenate } from '../validators/Tenate-validator';

const tenateRouter = express.Router();

tenateRouter.post(
  '/',
  isAuthenticate,
  canAccess([Roles.ADMIN]),
  validateCreateTenate,
  createTenate,
);

tenateRouter.get(
  '/get-tenates',
  isAuthenticate,
  canAccess([Roles.ADMIN]),
 GetTenates) 

export default tenateRouter;
