import { ICreateCarDto } from '../dtos/ICreateCarDto';
import { IListAvailableDto } from '../dtos/IListAvailableDto';
import { Car } from '../entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(data: IListAvailableDto): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
