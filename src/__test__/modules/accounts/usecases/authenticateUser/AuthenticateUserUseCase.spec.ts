import { AppError } from '@errors/AppError';
import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '../../repositories/in-memory/UsersTokenRepositoryInMemory';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayjsDateProvider
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
    await expect(
      authenticateUserUseCase.execute({
        email: 'failuser@example.com',
        password: 'failure',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDto = {
      name: 'user_test',
      email: 'email@example.com',
      password: '123456',
      driver_license: '123412345',
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'qsdfase',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
