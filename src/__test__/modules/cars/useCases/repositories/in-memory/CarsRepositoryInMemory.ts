import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { Car } from '@modules/cars/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDto): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
