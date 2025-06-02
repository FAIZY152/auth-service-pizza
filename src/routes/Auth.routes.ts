import express from 'express';
import { Regester } from '../controller/Auth.controller';

const userRouter = express.Router();

userRouter.post('/register', Regester);

userRouter.post('/login', (req, res) => {
  // Handle user login
});

export default userRouter;
