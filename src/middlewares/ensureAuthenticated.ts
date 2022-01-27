import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { UsersTokenRepository } from '@modules/accounts/repositories/implementations/UsersTokenRepository';

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { secret_refresh_token } = auth;
  const bearerToken = req.headers.authorization;

  const userTokensRepository = new UsersTokenRepository();

  if (!bearerToken) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { sub: user_id } = verify(token, secret_refresh_token);

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: user.user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
};

export default ensureAuthenticated;
