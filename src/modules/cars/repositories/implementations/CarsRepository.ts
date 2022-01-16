import { getRepository, Repository } from 'typeorm';

import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { Car } from '@modules/cars/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    throw new Error('Method not implemented.');
  }
}

export { CarsRepository };
