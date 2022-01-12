import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export default (): ListCategoriesController => {
  const listCategoriesRepository = new CategoriesRepository();
  const listCategpriesUseCase = new ListCategoriesUseCase(
    listCategoriesRepository
  );

  const listCategoriesController = new ListCategoriesController(
    listCategpriesUseCase
  );

  return listCategoriesController;
};
