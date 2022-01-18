import { AppError } from '@errors/AppError';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('shold not be able to add a new specification to a nonexistent car', async () => {
    const car_id = '12345';
    const specifications_id = ['54321'];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name test',
      description: 'Description test',
      brand: 'Brand test',
      category_id: '123123-kljnas213-klj123',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ASD3A23',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'specification test',
      description: 'test specificaiton',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
  });
});
