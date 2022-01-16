import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDto } from '@modules/cars/dtos/ICreateCategoryDto';
import { Category } from '@modules/cars/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const newCategory = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newCategory);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
