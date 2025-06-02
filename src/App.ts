import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import userRouter from './routes/Auth.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res, next) => {
  // Use of Error
  //   const err = createHttpError(401, 'You Cant Access this Route');
  //   next(err); // for handle error in async function so remember it

  res.send('Hello World!');
});

app.use('/auth', userRouter);

// middleware

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
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
