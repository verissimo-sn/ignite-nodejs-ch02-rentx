import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDto } from '@modules/accounts/dtos/ICreateUserTokenDto';
import { UserTokens } from '@modules/accounts/entities/UserTokens';

import { IUsersTokenRepository } from '../IUsersTokenRepository';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.repository.findOne({ refresh_token: token });
  }
}

export { UsersTokenRepository };
