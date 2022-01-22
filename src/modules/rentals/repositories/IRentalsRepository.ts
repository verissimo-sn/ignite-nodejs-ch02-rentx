import { ICreateRentalDto } from '../dtos/ICreateRentalDto';
import { Rental } from '../entities/Rental';

export interface IRentalsRepository {
  create(data: ICreateRentalDto): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
}
