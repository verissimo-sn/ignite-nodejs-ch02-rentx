import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

const rentalRoutes = Router();

const createRentalsController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

export { rentalRoutes };
