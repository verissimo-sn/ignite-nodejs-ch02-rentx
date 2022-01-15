import { getRepository, Repository } from 'typeorm';

import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { User } from '@modules/accounts/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    driver_license,
    avatar,
  }: ICreateUserDto): Promise<void> {
    const newUser = this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
    });

    await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.repository.findOne({ id: userId });

    return user;
  }
}

export { UsersRepository };
