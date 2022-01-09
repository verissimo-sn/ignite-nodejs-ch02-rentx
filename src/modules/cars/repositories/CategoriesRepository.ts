import { CategoryModel } from '../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: CategoryModel[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDto): void {
    const category = new CategoryModel();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): CategoryModel[] {
    return this.categories;
  }

  findByName(name: string): CategoryModel {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
