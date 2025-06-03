import { validationResult } from 'express-validator';
import { AppDataSource } from '../config/data-source';
import Logger from '../config/Logger';
import { Roles } from '../constants';
import { User } from '../entity/User';
import { RegisterService } from '../services/User.service';
import AsyncHandler from '../utils/TryCatch';
import { Request, Response, NextFunction } from 'express';
import { Config } from '../config/fileImport';
import { JwtPayload } from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
  persistRefreshToken,
} from '../services/Token.service';
import { RefreshToken } from '../entity/RefreshToken';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RequestBody extends Request {
  body: UserData;
}

export const Register = async (
  req: RequestBody,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // Validation
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const { firstName, lastName, email, password } = req.body;
  Logger.debug('New request to register a user', {
    firstName,
    lastName,
    email,
    password: '******',
  });
  try {
    const user = await RegisterService({
      firstName,
      lastName,
      email,
      password,
      role: Roles.CUSTOMER,
    });

    const payload: JwtPayload = {
      sub: String(user.id),
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const accessToken = await generateAccessToken(payload);

    // Persist the refresh token
    let refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

    const newRefreshToken = await persistRefreshToken(
      refreshTokenRepository,
      user,
    );

    const refreshToken = await generateRefreshToken({
      ...payload,
      id: String(newRefreshToken.id),
    });

    res.cookie('accessToken', accessToken, {
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
      httpOnly: true, // Very important
    });

    res.cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
      httpOnly: true, // Very important
    });

    res.status(201).json({ id: user.id });
  } catch (error: any) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};
