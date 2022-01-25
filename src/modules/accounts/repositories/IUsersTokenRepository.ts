import { ICreateUserTokenDto } from '../dtos/ICreateUserTokenDto';
import { UserTokens } from '../entities/UserTokens';

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDto): Promise<UserTokens>;
}

export { IUsersTokenRepository };
