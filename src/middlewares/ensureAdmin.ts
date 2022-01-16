import { Request, Response, NextFunction } from 'express';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';

const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
};

export default ensureAdmin;
