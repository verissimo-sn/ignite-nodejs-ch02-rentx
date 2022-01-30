import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { sub: user_id, email } = verify(token, secret_refresh_token);
    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
