import { getRepository, Repository } from 'typeorm';

import { SpecificationModel } from '../../entities/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<SpecificationModel>;

  constructor() {
    this.repository = getRepository(SpecificationModel);
  }

  async create({ name, description }: ICreateSpecificationDto): Promise<void> {
    const newSpecification = this.repository.create({ name, description });

    await this.repository.save(newSpecification);
  }

  async findByName(name: string): Promise<SpecificationModel> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
