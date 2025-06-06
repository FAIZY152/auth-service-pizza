import express from 'express';
import { createTenate } from '../controller/Tenate.controller';
import isAuthenticate from '../middleware/isAuthenticate';

const tenateRouter = express.Router();

tenateRouter.post('/', isAuthenticate, createTenate);

export default tenateRouter;
