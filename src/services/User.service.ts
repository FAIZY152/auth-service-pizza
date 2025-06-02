import createHttpError from 'http-errors';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';

export const RegisterService = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  // Check if user already exists

  // Hash the password

  const existUser = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });
  if (existUser) {
    const err = createHttpError(400, 'Email is already exists!');
    throw err;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userRepository = await AppDataSource.getRepository(User);
  const user = await userRepository.save({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  return user;
};
