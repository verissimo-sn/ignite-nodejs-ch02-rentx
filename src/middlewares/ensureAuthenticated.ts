import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { secret_token } = auth;
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { sub: user_id } = verify(token, secret_token);

    req.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
};

export default ensureAuthenticated;
