import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoute.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoute.get('/', (req, res) => {
  const categories = categoriesRepository.list();

  res.status(200).json(categories);
});

export { categoriesRoute };
