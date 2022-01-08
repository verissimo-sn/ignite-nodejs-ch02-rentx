import { SpecificationModel } from '../model/Specification';

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDto): void;
  findByName(name: string): SpecificationModel;
}
