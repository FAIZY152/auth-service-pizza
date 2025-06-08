import express from 'express';
import { CreateUser } from '../controller/User.controller';

const router = express.Router();

router.post('/create', CreateUser);

export default router;
