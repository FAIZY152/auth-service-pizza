import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import userRouter from './routes/Auth.routes';
import cookieParser from 'cookie-parser';
import tenateRouter from './routes/Tenate.routes';
import router from './routes/User.routes';
import cors from 'cors';

const app = express();

app.use(express.static('public')); // Serve static files from the 'public'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

// Routes
app.get('/', (req, res, next) => {
  // Use of Error
  //   const err = createHttpError(401, 'You Cant Access this Route');
  //   next(err); // for handle error in async function so remember it

  res.send('Hello World!');
});

app.use('/auth', userRouter);
app.use('/tenants', tenateRouter);
app.use('/user', router);

// middleware

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        path: '',
        location: '',
      },
    ],
  });
});

export default app;
