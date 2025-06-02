import createHttpError from 'http-errors';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

export const RegisterService = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  // Check if user already exists
  const user = await this.userRepository.findOne({
    where: { email: email },
  });
  if (user) {
    const err = createHttpError(400, 'Email is already exists!');
    throw err;
  }
  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userRepository = await AppDataSource.getRepository(User);
  const user = await userRepository.save({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  return user;
};
