import express from 'express';
import { CreateUser } from '../controller/User.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';

const router = express.Router();

router.post('/create', isAuthenticate, canAccess([Roles.ADMIN]), CreateUser);

export default router;
