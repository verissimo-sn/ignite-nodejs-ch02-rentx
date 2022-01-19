import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAdmin from '@middlewares/ensureAdmin';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableController } from '@modules/cars/useCases/listAvailableCars/ListAvailableController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImgesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

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

carsRoutes.post(
  '/images/:id',
  upload.array('images'),
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.handle
);

carsRoutes.get('/available', listAvailableCars.handle);

export { carsRoutes };
