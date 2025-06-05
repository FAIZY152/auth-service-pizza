import express from 'express';
import { createTenate } from '../controller/Tenate.controller';

const tenateRouter = express.Router();

tenateRouter.post('/', createTenate);

export default tenateRouter;
