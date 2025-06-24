import express from 'express';
import { CreateUser, getOne } from '../controller/User.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';

const router = express.Router();

router.post('/create', isAuthenticate, canAccess([Roles.ADMIN]), CreateUser);
router.post('/', isAuthenticate, canAccess([Roles.ADMIN]), getOne);

export default router;
