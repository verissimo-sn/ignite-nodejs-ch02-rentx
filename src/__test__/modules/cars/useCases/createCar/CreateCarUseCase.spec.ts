import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';

import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('shold be able to create a new car', async () => {
    const car = {
      name: 'Name test',
      description: 'Description test',
      brand: 'Brand test',
      category_id: '123123-kljnas213-klj123',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ASD3A23',
    };

    await createCarUseCase.execute(car);
  });
});
