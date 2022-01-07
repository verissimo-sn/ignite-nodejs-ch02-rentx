import { Router } from 'express';

import { CategoryRepository } from '../repositories/CategoriesRepository';

const categoriesRoute = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoute.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: 'Category already exists' });
  }

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoute.get('/', (req, res) => {
  const categories = categoriesRepository.list();

  res.status(200).json(categories);
});

export { categoriesRoute };
