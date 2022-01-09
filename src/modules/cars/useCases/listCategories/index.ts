import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const listCategoriesRepository = new CategoriesRepository();
const listCategpriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository
);

const listCategoriesController = new ListCategoriesController(
  listCategpriesUseCase
);

export { listCategoriesController };
