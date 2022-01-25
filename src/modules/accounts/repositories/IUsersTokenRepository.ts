import { ICreateUserTokenDto } from '../dtos/ICreateUserTokenDto';
import { UserTokens } from '../entities/UserTokens';

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDto): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokenRepository };
