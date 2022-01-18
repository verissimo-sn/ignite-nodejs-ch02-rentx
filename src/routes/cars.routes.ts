import { Router } from 'express';

import ensureAdmin from '@middlewares/ensureAdmin';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableController } from '@modules/cars/useCases/listAvailableCars/ListAvailableController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCars.handle);

export { carsRoutes };
