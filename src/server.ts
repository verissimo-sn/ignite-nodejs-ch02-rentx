import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import { AppError } from '@errors/AppError';

import { router } from './routes';
import swaggerConf from './swagger.json';

import './database';
import './shared/container';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

const port = 3333;
app.listen(port, () => console.log(`Server is running on port ${port} !`));
