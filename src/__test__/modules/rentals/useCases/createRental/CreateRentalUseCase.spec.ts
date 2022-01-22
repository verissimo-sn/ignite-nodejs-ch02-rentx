import dayjs from 'dayjs';

import { AppError } from '@errors/AppError';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { RentalsRepositoryInMemory } from '../../repositories/inMemory/RentalsRepositoryInMemory';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '0123456',
      user_id: '09876521',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '09876521',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: '1551341',
        user_id: '09876521',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '123124',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '1234123',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '1234123',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
