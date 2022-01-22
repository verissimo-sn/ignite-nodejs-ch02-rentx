import { AppError } from '@errors/AppError';
import { ICreateRentalDto } from '@modules/rentals/dtos/ICreateRentalDto';
import { Rental } from '@modules/rentals/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

class CreateRentalUseCase {
  constructor(
    private dateProvider: IDateProvider,
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expect_return_date,
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
      endDate: expect_return_date,
      startDate: dateNow,
    });

    if (compareDate < minRentHours) {
      throw new AppError('Invalid return time');
    }
    return this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });
  }
}

export { CreateRentalUseCase };
