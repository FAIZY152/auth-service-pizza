import { AppDataSource } from '../config/data-source';
import Logger from '../config/Logger';
import { Roles } from '../constants';
import { User } from '../entity/User';
import { RegisterService } from '../services/User.service';
import AsyncHandler from '../utils/TryCatch';
import { Request, Response, NextFunction } from 'express';

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
    return res.status(201).json({
      message: 'User registered successfully',
      id: user.id,
    });
  } catch (error) {
    throw error;
  }
};
