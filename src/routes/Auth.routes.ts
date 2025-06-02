import express from 'express';
import { Register } from '../controller/Auth.controller';
import { registerValidator } from '../validators/Register-validator';

const userRouter = express.Router();

userRouter.post('/register', registerValidator, Register);

userRouter.post('/login', (req, res) => {
  // Handle user login
});

export default userRouter;
