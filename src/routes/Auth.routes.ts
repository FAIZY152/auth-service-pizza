import express from 'express';
import { Login, Register } from '../controller/Auth.controller';
import { registerValidator } from '../validators/Register-validator';
import { loginValidator } from '../validators/Login-validators';

const userRouter = express.Router();

userRouter.post('/register', registerValidator, Register);

userRouter.post('/login', loginValidator, Login);

export default userRouter;
