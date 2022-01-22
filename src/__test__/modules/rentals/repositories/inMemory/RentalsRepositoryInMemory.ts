import { ICreateRentalDto } from '@modules/rentals/dtos/ICreateRentalDto';
import { Rental } from '@modules/rentals/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expect_return_date,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expect_return_date,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}

export { RentalsRepositoryInMemory };
