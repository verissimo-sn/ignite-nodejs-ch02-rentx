import { getRepository, Repository } from 'typeorm';

import { ICreateCarsImagesDto } from '@modules/cars/dtos/ICreateCarsImagesDto';
import { CarImage } from '@modules/cars/entities/CarImage';

import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({
    car_id,
    image_name,
  }: ICreateCarsImagesDto): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
