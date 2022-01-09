import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoute = Router();

categoriesRoute.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoute.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoute };
