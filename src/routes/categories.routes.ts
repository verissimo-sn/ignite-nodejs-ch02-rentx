import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoriesRepository';

const categoriesRoute = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoute.post('/', (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoute.get('/', (req, res) => {
  const categories = categoriesRepository.list();

  res.status(200).json(categories);
});

export { categoriesRoute };
