import { UserData, LimitedUserData, UserQueryParams } from '../types/index'; // adjust path as needed
import createHttpError from 'http-errors';
import { User } from '../entity/User';
import { Brackets, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcrypt';

async function create({
  firstName,
  lastName,
  email,
  password,
  role,
  tenantId,
}: UserData) {
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });
  if (user) {
    throw createHttpError(400, 'Email is already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    return await AppDataSource.getRepository(User).save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      tenant: tenantId ? { id: tenantId } : undefined,
    });
  } catch (err) {
    throw createHttpError(500, 'Failed to store the data in the database');
  }
}

export async function findByEmailWithPassword(email: string) {
  return await AppDataSource.getRepository(User).findOne({
    where: { email },
    relations: { tenant: true },
  });
}

async function findById(id: number) {
  return await AppDataSource.getRepository(User).findOne({
    where: { id },
    relations: { tenant: true },
  });
}

async function update(
  userId: number,
  { firstName, lastName, role, email, tenantId }: LimitedUserData,
) {
  try {
    return await AppDataSource.getRepository(User).update(userId, {
      firstName,
      lastName,
      role,
      email,
      tenant: tenantId ? { id: tenantId } : null,
    });
  } catch (err) {
    throw createHttpError(500, 'Failed to update the user in the database');
  }
}

// export async function findAll(validateQuery: UserQueryParams) {
//   // for paginaton in type orm we need to crate query builder
//   const queryBuilder =
//     AppDataSource.getRepository(User).createQueryBuilder('user');

//   if (validateQuery.q) {
//     const searchTerm = `%${validateQuery.q}%`;
//     queryBuilder.where(
//       new Brackets((qb) => {
//         qb.where("CONCAT(user.firstName, ' ', user.lastName) ILike :q", {
//           q: searchTerm,
//         }).orWhere('user.email ILike :q', { q: searchTerm });
//       }),
//     );
//   }

//   if (validateQuery.role) {
//     queryBuilder.andWhere('user.role = :role', {
//       role: validateQuery.role,
//     });
//   }

//   const result = await queryBuilder
//     .skip((validateQuery.currentPage - 1) * validateQuery.perPage)
//     .take(validateQuery.perPage)
//     .getManyAndCount();

//   return result;
//   // return await AppDataSource.getRepository(User).find();
// }

export async function findAll(validateQuery: UserQueryParams) {
  const { q, role, perPage = 6, currentPage = 1 } = validateQuery;
  const queryBuilder =
    AppDataSource.getRepository(User).createQueryBuilder('user');

  // pagination
  const result = await queryBuilder
    .skip((currentPage - 1) * perPage)
    .take(perPage)
    .getManyAndCount();

  console.log('result', result);

  return result;
}
async function deleteById(userId: number) {
  return await AppDataSource.getRepository(User).delete(userId);
}

// Export all service functions
export const AdminUserService = {
  create,
  findByEmailWithPassword,
  findById,
  findAll,
  update,
  deleteById,
};
