import express from 'express';
import {
  GetProfile,
  Login,
  Refresh,
  Register,
} from '../controller/Auth.controller';
import { registerValidator } from '../validators/Register-validator';
import { loginValidator } from '../validators/Login-validators';
import isAuthenticate from '../middleware/isAuthenticate';
import IsRefreshToken from '../middleware/IsRefreshToken';
import checkRefreshToken from '../middleware/check-refresh-token';

const userRouter = express.Router();

userRouter.post('/register', registerValidator, Register);

userRouter.post('/login', loginValidator, Login);
userRouter.get('/self', isAuthenticate, GetProfile);
userRouter.post('/refresh-token', checkRefreshToken, Refresh);
    
export default userRouter;
