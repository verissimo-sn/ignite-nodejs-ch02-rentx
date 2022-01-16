import { ICreateCarDto } from '../dtos/ICreateCarDto';
import { Car } from '../entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findByLicencePlate(licensePlate: string): Promise<Car>;
}
