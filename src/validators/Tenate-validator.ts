import { body } from 'express-validator';

export const validateCreateTenate = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
];
