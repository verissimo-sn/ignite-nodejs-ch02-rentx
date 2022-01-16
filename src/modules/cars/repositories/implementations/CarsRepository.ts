import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepository implements ICarsRepository {
  create: (data: ICreateCarDto) => Promise<void>;
}

export { CarsRepository };
