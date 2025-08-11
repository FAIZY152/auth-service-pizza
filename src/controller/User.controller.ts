import Logger from '../config/Logger';
import { Roles } from '../constants';
import { RegisterService } from '../services/User.service';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { validationResult, matchedData } from 'express-validator';
import { UserQueryParams, UpdateUserRequest, UserData } from '../types/index'; // adjust import paths as needed
import { AdminUserService } from '../services/Admin.service';
import { User } from '../entity/User';
import { QueryBuilder } from 'typeorm';
import { AppDataSource } from '../config/data-source';
// adjust based on your project structure



interface RequestBody extends Request {
  body: User;
}

export const CreateUser = async (req: RequestBody, res: Response) => {
  try {
    // Logic to create a user
    const { firstName, lastName, email, password, role } = req.body;
    Logger.debug('New request to register a user', {
      firstName,
      lastName,
      email,
      password: '******',
      tenantId: req.body.tenant.id,
    });

    const user = await AdminUserService.create({
      firstName,
      lastName,
      email,
      password,
      role: role || Roles.CUSTOMER,
      tenantId: req.body.tenant.id,
    });

    res.status(201).json({
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getOne(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;

  if (isNaN(Number(userId))) {
    next(createHttpError(400, 'Invalid url param.'));
    return;
  }

  try {
    const user = await AdminUserService.findById(Number(userId));

    if (!user) {
      next(createHttpError(400, 'User does not exist.'));
      return;
    }

    Logger.info('User has been fetched', { id: user.id });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// export async function update(
//   req: UpdateUserRequest,
//   res: Response,
//   next: NextFunction,
// ) {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     return res.status(400).json({ errors: result.array() });
//   }

//   const { firstName, lastName, role, email, tenantId } = req.body;
//   const userId = req.params.id;

//   if (isNaN(Number(userId))) {
//     next(createHttpError(400, 'Invalid url param.'));
//     return;
//   }

//   Logger.debug('Request for updating a user', req.body);

//   try {
//     await Admin.service.update(Number(userId), {
//       firstName,
//       lastName,
//       role,
//       email,
//       tenantId,
//     });

//     Logger.info('User has been updated', { id: userId });
//     res.json({ id: Number(userId) });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function getAll(req: Request, res: Response, next: NextFunction) {
//   const validatedQuery = matchedData(req, { onlyValidData: true });

//   try {
//     const [users, count] = await AdminUserService.getAll(
//       validatedQuery as UserQueryParams,
//     );

//     Logger.info('All users have been fetched');
//     res.json({
//       currentPage: validatedQuery.currentPage as number,
//       perPage: validatedQuery.perPage as number,
//       total: count,
//       data: users,
//     });
//   } catch (err) {
//     next(err);
//   }
// } => write by Rakesh sir but dont know how its work

export async function getAll(req: Request, res: Response, next: NextFunction):Promise<any> {
  try {
    const validateQuery = matchedData(req, { onlyValidData: true });
const queryBuilder = AppDataSource.getRepository(User).createQueryBuilder('user');


const { email , firstName , lastName } = validateQuery;
if (email) {
  queryBuilder.where('user.email = :email', { email });
}
if (firstName) {
  queryBuilder.andWhere('user.firstName = :firstName', { firstName });
}
if (lastName) {
  queryBuilder.andWhere('user.lastName = :lastName', { lastName });
}
    // search
    const search = validateQuery.q;

    if (search) {
      const searchTerm = `%${search}%`;
      queryBuilder.where ("CONCAT(user.firstName, ' ', user.lastName) ILike :q", {
        q: searchTerm,  
      }); 
    }

    // role search

    const role = validateQuery.role;
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }
      // pagination
    const [users, count] = await queryBuilder.leftJoinAndSelect('user.tenant', 'tenant')
    .skip((validateQuery.currentPage - 1) * validateQuery.perPage)
    .take(validateQuery.perPage)
    .getManyAndCount();


    
    Logger.info('All users have been fetched');
    console.log(queryBuilder.getSql());
     return res.json({
        currentPage: validateQuery.currentPage as number,
        perPage: validateQuery.perPage as number,
        total: count,
        data: users,
      });
      
      
    } catch (err) {
      next(err);
    }
}


  