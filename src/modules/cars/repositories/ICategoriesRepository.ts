import { CategoryModel } from '../entities/Category';

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<CategoryModel>;
  list(): Promise<CategoryModel[]>;
  create({ name, description }: ICreateCategoryDto): Promise<void>;
}
