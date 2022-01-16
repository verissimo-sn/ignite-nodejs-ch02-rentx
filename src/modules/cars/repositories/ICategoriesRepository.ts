import { ICreateCategoryDto } from '../dtos/ICreateCategoryDto';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDto): Promise<void>;
}
