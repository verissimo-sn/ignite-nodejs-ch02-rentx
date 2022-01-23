import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDto } from '@modules/rentals/dtos/ICreateRentalDto';
import { Rental } from '@modules/rentals/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    user_id,
    car_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: null } });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
}

export { RentalsRepository };
