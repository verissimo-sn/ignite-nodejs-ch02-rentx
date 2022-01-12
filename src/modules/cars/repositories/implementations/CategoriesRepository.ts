import { getRepository, Repository } from 'typeorm';

import { CategoryModel } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<CategoryModel>;

  constructor() {
    this.repository = getRepository(CategoryModel);
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const newCategory = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newCategory);
  }

  async list(): Promise<CategoryModel[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<CategoryModel> {
    const category = this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
