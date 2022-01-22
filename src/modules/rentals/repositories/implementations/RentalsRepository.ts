import { ICreateRentalDto } from '@modules/rentals/dtos/ICreateRentalDto';
import { Rental } from '@modules/rentals/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  findOpenRentalByUserId(user_id: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  create(data: ICreateRentalDto): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
}

export { RentalsRepository };
