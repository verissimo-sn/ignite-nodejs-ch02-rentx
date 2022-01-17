import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { Car } from '@modules/cars/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);

    return car;
  }
}

export { CarsRepositoryInMemory };
