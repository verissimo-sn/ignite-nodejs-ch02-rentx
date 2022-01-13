import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { sub: userId } = verify(token, '15b1c269e2207484d60e5f460eb76119');

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
};

export default ensureAuthenticated;
