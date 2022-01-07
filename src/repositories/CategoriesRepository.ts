import { CategoryModel } from '../model/Category';

interface ICreateCategoryDto {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: CategoryModel[];

  constructor() {
    this.categories = [];
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
}

export { CategoryRepository };
