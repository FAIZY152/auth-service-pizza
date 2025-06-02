import express from 'express';
import { Register } from '../controller/Auth.controller';

const userRouter = express.Router();

userRouter.post('/register', Register);

userRouter.post('/login', (req, res) => {
  // Handle user login
});

export default userRouter;
