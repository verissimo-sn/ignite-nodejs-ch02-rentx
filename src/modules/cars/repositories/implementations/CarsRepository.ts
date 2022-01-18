import { getRepository, Repository } from 'typeorm';

import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { IListAvailableDto } from '@modules/cars/dtos/IListAvailableDto';
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
    specifications,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ license_plate: licensePlate });
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IListAvailableDto): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('cars.available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('name like :name', { name: `%${name}%` });
    }

    if (brand) {
      carsQuery.andWhere('brand like :brand', { brand: `%${brand}%` });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }
}

export { CarsRepository };
