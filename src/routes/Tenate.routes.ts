import express from 'express';
import { createTenate } from '../controller/Tenate.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';

const tenateRouter = express.Router();

tenateRouter.post('/', isAuthenticate, canAccess([Roles.ADMIN]), createTenate);

export default tenateRouter;
