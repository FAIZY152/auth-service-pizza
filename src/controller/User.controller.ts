import Logger from '../config/Logger';
import { Roles } from '../constants';
import { RegisterService } from '../services/User.service';
import { Request, Response } from 'express';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a user
    const { firstName, lastName, email, password } = req.body;
    Logger.debug('New request to register a user', {
      firstName,
      lastName,
      email,
      password: '******',
    });

    const user = await RegisterService({
      firstName,
      lastName,
      email,
      password,
      role: Roles.MANAGER,
    });

    res.status(201).json({
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
