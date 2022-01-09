import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const listCategoriesRepository = CategoriesRepository.getInstance();
const listCategpriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository
);

const listCategoriesController = new ListCategoriesController(
  listCategpriesUseCase
);

export { listCategoriesController };
