import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import userRouter from './routes/Auth.routes';
import cookieParser from 'cookie-parser';
import tenateRouter from './routes/Tenate.routes';
import router from './routes/User.routes';
import cors from 'cors';
import { globalErrorHandler } from './middleware/global-error-handler';

const app = express();

app.use(express.static('public')); // Serve static files from the 'public'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
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

//  error middle ware middleware

app.use(globalErrorHandler);
export default app;
