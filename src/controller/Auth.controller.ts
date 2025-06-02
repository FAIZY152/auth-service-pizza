import AsyncHandler from '../utils/TryCatch';

export const Regester = AsyncHandler(async (req, res, next) => {
  res.status(201).json({
    message: 'User registered successfully',
  });
});
