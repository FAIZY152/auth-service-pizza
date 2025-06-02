import { validationResult } from 'express-validator';
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
    return res.status(201).json({
      message: 'User registered successfully',
      id: user.id,
    });
  } catch (error: any) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};
