import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { IListAvailableDto } from '@modules/cars/dtos/IListAvailableDto';
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
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findAvailable({
    name,
    category_id,
    brand,
  }: IListAvailableDto): Promise<Car[]> {
    return this.cars.filter((car) => car.available === true);
    // time 20:05
  }
}

export { CarsRepositoryInMemory };
