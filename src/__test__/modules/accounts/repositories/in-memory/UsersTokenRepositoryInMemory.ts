import { ICreateUserTokenDto } from '@modules/accounts/dtos/ICreateUserTokenDto';
import { UserTokens } from '@modules/accounts/entities/UserTokens';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(index, 1);
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === token
    );
  }
}

export { UsersTokenRepositoryInMemory };
