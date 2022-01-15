import { AppError } from '@errors/AppError';
import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user and return token and user', async () => {
    const user: ICreateUserDto = {
      name: 'user_test',
      email: 'email@example.com',
      password: '123456',
      driver_license: '123412345',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  it('should not be able to authenticate nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'failuser@example.com',
        password: 'failure',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDto = {
        name: 'user_test',
        email: 'email@example.com',
        password: '123456',
        driver_license: '123412345',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'qsdfase',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
