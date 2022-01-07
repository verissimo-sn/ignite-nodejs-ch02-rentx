import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoriesRepository';

const categoriesRoute = Router();

categoriesRoute.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoriesRepository = new CategoryRepository();

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

export { categoriesRoute };
