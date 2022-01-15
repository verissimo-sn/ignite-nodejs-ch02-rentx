import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDto): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, {
      ...data,
    });

    this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const users = this.users.find((user) => user.email === email);

    return users;
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((user) => user.id === userId);

    return user;
  }
}

export { UsersRepositoryInMemory };
