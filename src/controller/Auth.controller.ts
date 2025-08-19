import { validationResult } from 'express-validator';
import { AppDataSource } from '../config/data-source';
import Logger from '../config/Logger';
import { Roles } from '../constants';
import { User } from '../entity/User';
import {
  deleteRefreshToken,
  FindById,
  LoginService,
  RegisterService,
} from '../services/User.service';
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
import { AuthRequest, UserData } from '../types';
import createHttpError from 'http-errors';

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
  const { firstName, lastName, email, password, role } = req.body;
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
      role: role || Roles.CUSTOMER,
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
      domain: 'localhost',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
      httpOnly: true, // Very important
    });

    res.cookie('refreshToken', refreshToken, {
      domain: 'localhost',
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

export const Login = async (
  req: RequestBody,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // Validation
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const { email, password } = req.body;
  Logger.debug('New request to login a user', {
    email,
    password: '******',
  });
  try {
    const user = await LoginService(email, password);

    const payload: JwtPayload = {
      sub: String(user.id),
      role: user.role,
      email: user.email,
      tenantId: user.tenant,
    };

    console.log('user', user);

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
      domain: 'localhost',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
      httpOnly: true, // Very important
    });

    res.cookie('refreshToken', refreshToken, {
      domain: 'localhost',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
      httpOnly: true, // Very important
    });

    res.status(200).json({ id: user.id });
  } catch (error) {
    next(error);
  }
};

export const GetProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await FindById(Number(req.auth?.sub));
    res.json({ ...user, password: undefined });
  } catch (error) {
    next(error);
  }
};

export const Refresh = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload: JwtPayload = {
      sub: req.auth.sub,
      role: req.auth.role,
    };

    const accessToken = await generateAccessToken(payload);

    const user = await FindById(Number(req.auth.sub));
    if (!user) {
      const error = createHttpError(400, 'User with the token could not find');
      next(error);
      return;
    }

    // Persist the refresh token
    let refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

    const newRefreshToken = await persistRefreshToken(
      refreshTokenRepository,
      user,
    );

    // Delete old refresh token
    await deleteRefreshToken(Number(req.auth.id));

    const refreshToken = await generateRefreshToken({
      ...payload,
      id: String(newRefreshToken.id),
    });

    res.cookie('accessToken', accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
      httpOnly: true, // Very important
    });

    res.cookie('refreshToken', refreshToken, {
      domain: 'localhost',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
      httpOnly: true, // Very important
    });

    Logger.info('User has been logged in', { id: user.id });
    res.json({ id: user.id });
  } catch (err) {
    next(err);
    return;
  }
};

export const Logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteRefreshToken(Number(req.auth.id));
    Logger.info('Refresh token has been deleted', {
      id: req.auth.id,
    });
    Logger.info('User has been logged out', { id: req.auth.sub });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({});
  } catch (err) {
    next(err);
    return;
  }
};
