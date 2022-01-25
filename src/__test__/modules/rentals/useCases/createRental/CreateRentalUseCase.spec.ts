import dayjs from 'dayjs';

import { AppError } from '@errors/AppError';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../repositories/inMemory/RentalsRepositoryInMemory';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car test',
      description: 'description test',
      daily_rate: 50,
      license_plate: 'bde4z123',
      fine_amount: 80,
      brand: 'brandTest',
      category_id: '6fbc49c2-0582-46ac-aad2-6961c6024ada',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '09876521',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '0123456',
      user_id: '09876521',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '1551asd341',
        user_id: '09876521',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('There is a rental in progress for user'));
  });

  it('should not be able to create a new rental if there is another to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '0123456',
      user_id: '09876521',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '1234123',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable !'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '0123456',
        user_id: '1234123',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});
