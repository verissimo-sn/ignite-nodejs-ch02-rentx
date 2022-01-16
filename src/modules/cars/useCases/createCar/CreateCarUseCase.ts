import { inject, injectable } from 'tsyringe';

import { ICreateCarDto } from '@modules/cars/dtos/ICreateCarDto';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDto): Promise<void> {
    await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });
  }
}

export { CreateCarUseCase };
