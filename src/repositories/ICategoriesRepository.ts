import { CategoryModel } from '../model/Category';

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): CategoryModel;
  list(): CategoryModel[];
  create({ name, description }: ICreateCategoryDto): void;
}
