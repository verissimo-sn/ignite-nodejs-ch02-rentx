import { SpecificationModel } from '../../entities/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: SpecificationModel[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDto): void {
    const specification = new SpecificationModel();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }

  findByName(name: string): SpecificationModel {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };
