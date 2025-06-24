import express from 'express';
import { CreateUser, getAll, getOne } from '../controller/User.controller';
import isAuthenticate from '../middleware/isAuthenticate';
import { canAccess } from '../middleware/canAccess';
import { Roles } from '../constants';

const router = express.Router();

router.post('/create', isAuthenticate, canAccess([Roles.ADMIN]), CreateUser);
router.get('/:id', isAuthenticate, canAccess([Roles.ADMIN]), getOne);
router.get('/', isAuthenticate, canAccess([Roles.ADMIN]), getAll);

export default router;
