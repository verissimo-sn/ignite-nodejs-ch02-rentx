import { AppError } from '@errors/AppError';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';

import { CategoriesRepositoryInMemory } from '../repositories/in-memory/CategoriesRepositoryInMemory';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('Shold be able to create a new category', async () => {
    const category = {
      name: 'category_test',
      description: 'categoria test',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('Shold not be able to create a new category with name already exists', async () => {
    expect(async () => {
      const category = {
        name: 'category_test',
        description: 'categoria test',
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
