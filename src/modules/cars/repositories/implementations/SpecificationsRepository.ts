import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDto): Promise<void> {
    const newSpecification = this.repository.create({ name, description });

    await this.repository.save(newSpecification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
