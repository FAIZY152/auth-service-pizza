import express from 'express';
import { GetProfile, Login, Register } from '../controller/Auth.controller';
import { registerValidator } from '../validators/Register-validator';
import { loginValidator } from '../validators/Login-validators';
import isAuthenticate from '../middleware/isAuthenticate';

const userRouter = express.Router();

userRouter.post('/register', registerValidator, Register);

userRouter.post('/login', loginValidator, Login);
userRouter.get('/self', isAuthenticate, GetProfile);

export default userRouter;
