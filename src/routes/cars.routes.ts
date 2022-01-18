import { Router } from 'express';

import ensureAdmin from '@middlewares/ensureAdmin';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableController } from '@modules/cars/useCases/listAvailableCars/ListAvailableController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.get('/available', listAvailableCars.handle);

export { carsRoutes };
