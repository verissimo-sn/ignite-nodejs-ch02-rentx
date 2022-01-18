import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Lis available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = {
      name: 'car 1',
      description: 'car description',
      daily_rate: 50,
      license_plate: 'carlicense',
      fine_amount: 80,
      brand: 'car brand',
      category_id: 'category_id',
    };

    const createdCar = await carsRepositoryInMemory.create(car);
    const availableCars = await listAvailableCarsUseCase.execute({});

    expect(availableCars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = {
      name: 'car 2',
      description: 'car description',
      daily_rate: 50,
      license_plate: 'carlicense',
      fine_amount: 80,
      brand: 'car brand',
      category_id: 'category_id',
    };

    const createdCar = await carsRepositoryInMemory.create(car);
    const availableCars = await listAvailableCarsUseCase.execute({
      name: car.name,
    });

    expect(availableCars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = {
      name: 'car 3',
      description: 'car description',
      daily_rate: 50,
      license_plate: 'carlicense',
      fine_amount: 80,
      brand: 'car_brand',
      category_id: 'category_id',
    };

    const createdCar = await carsRepositoryInMemory.create(car);
    const availableCars = await listAvailableCarsUseCase.execute({
      name: car.brand,
    });

    expect(availableCars).toEqual([createdCar]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = {
      name: 'car 4',
      description: 'car description',
      daily_rate: 50,
      license_plate: 'carlicense',
      fine_amount: 80,
      brand: 'car_brand',
      category_id: 'category_id',
    };

    const createdCar = await carsRepositoryInMemory.create(car);
    const availableCars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(availableCars).toEqual([createdCar]);
  });
});
