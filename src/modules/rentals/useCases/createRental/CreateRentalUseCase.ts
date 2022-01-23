import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDto } from '@modules/rentals/dtos/ICreateRentalDto';
import { Rental } from '@modules/rentals/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDto): Promise<Rental> {
    const minRentHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable !');
    }

    const RentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (RentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDate = this.dateProvider.compareInHours({
      endDate: expected_return_date,
      startDate: dateNow,
    });

    if (compareDate < minRentHours) {
      throw new AppError('Invalid return time');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    const isAvailable = false;
    await this.carsRepository.updateAvailable(car_id, isAvailable);

    return rental;
  }
}

export { CreateRentalUseCase };
