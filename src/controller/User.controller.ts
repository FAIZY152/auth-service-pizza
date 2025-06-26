import Logger from '../config/Logger';
import { Roles } from '../constants';
import { RegisterService } from '../services/User.service';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { validationResult, matchedData } from 'express-validator';
import { UserQueryParams, UpdateUserRequest } from '../types/index'; // adjust import paths as needed
import { AdminUserService } from '../services/Admin.service';
// adjust based on your project structure

export const CreateUser = async (req: Request, res: Response) => {
  try {
    // Logic to create a user
    const { firstName, lastName, email, password, role } = req.body;
    Logger.debug('New request to register a user', {
      firstName,
      lastName,
      email,
      password: '******',
    });

    const user = await AdminUserService.create({
      firstName,
      lastName,
      email,
      password,
      role: role || Roles.CUSTOMER, // Default to CUSTOMER role if not provided
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

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const validateQuery = matchedData(req, { onlyValidData: true });
    console.log('pagination', validateQuery);

    const users = await AdminUserService.findAll();
    res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
}

// export async function destroy(req: Request, res: Response, next: NextFunction) {
//   const userId = req.params.id;

//   if (isNaN(Number(userId))) {
//     next(createHttpError(400, 'Invalid url param.'));
//     return;
//   }

//   try {
//     await userService.deleteById(Number(userId));

//     Logger.info('User has been deleted', { id: Number(userId) });
//     res.json({ id: Number(userId) });
//   } catch (err) {
//     next(err);
//   }
// }
