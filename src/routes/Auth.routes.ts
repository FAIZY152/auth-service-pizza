import express from 'express';

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  res.status(201).json({
    message: 'User registered successfully',
  });
});

userRouter.post('/login', (req, res) => {
  // Handle user login
});

export default userRouter;
