import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token invalid !');
    }

    const dateNow = this.dateProvider.dateNow();

    const isExpired = this.dateProvider.compareIfBefore({
      startDate: userToken.expires_date,
      endDate: dateNow,
    });

    if (isExpired) {
      throw new AppError('Token expired !');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
