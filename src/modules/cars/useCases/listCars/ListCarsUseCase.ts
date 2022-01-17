import { IListAvailableDto } from '@modules/cars/dtos/IListAvailableDto';
import { Car } from '@modules/cars/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    name,
    category_id,
    brand,
  }: IListAvailableDto): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable({
      name,
      category_id,
      brand,
    });
    return cars;
  }
}

export { ListCarsUseCase };
