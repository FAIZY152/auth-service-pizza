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

async function findByEmailWithPassword(email: string) {
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

// async function getAll(validatedQuery: UserQueryParams) {
//   const queryBuilder =
//     AppDataSource.getRepository(User).createQueryBuilder('user');

//   if (validatedQuery.q) {
//     const searchTerm = `%${validatedQuery.q}%`;
//     queryBuilder.where(
//       new Brackets((qb) => {
//         qb.where("CONCAT(user.firstName, ' ', user.lastName) ILike :q", {
//           q: searchTerm,
//         }).orWhere('user.email ILike :q', { q: searchTerm });
//       }),
//     );
//   }

//   if (validatedQuery.role) {
//     queryBuilder.andWhere('user.role = :role', {
//       role: validatedQuery.role,
//     });
//   }

//   const result = await queryBuilder
//     .leftJoinAndSelect('user.tenant', 'tenant')
//     .skip((validatedQuery.currentPage - 1) * validatedQuery.perPage)
//     .take(validatedQuery.perPage)
//     .orderBy('user.id', 'DESC')
//     .getManyAndCount();

//   return result;
// }

export async function findAll() {
  
  return await AppDataSource.getRepository(User).find();
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
