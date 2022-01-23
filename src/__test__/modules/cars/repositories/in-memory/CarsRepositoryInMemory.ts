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

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findAvailable({
    name,
    category_id,
    brand,
  }: IListAvailableDto): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
