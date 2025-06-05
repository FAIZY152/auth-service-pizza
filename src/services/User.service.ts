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

export const LoginService = async (email: string, password: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      const err = createHttpError(400, 'Invalid credentials');
      throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const err = createHttpError(400, 'Invalid credentials');
      throw err;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const FindById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    const err = createHttpError(404, 'User not found');
    throw err;
  }
  return user;
};
export const FindByEmail = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });
  if (!user) {
    const err = createHttpError(404, 'User not found');
    throw err;
  }
  return user;
};

export const deleteRefreshToken = async (tokenId: number) => {
  try {
    const refreshTokenRepository = AppDataSource.getRepository(User);
    const result = await refreshTokenRepository.delete({ id: tokenId });
    return result;
  } catch (error) {
    const err = createHttpError(500, 'Error deleting refresh token');
    throw err;
  }
};
