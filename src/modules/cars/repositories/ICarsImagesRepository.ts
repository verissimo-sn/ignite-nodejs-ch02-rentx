import { ICreateCarsImagesDto } from '../dtos/ICreateCarsImagesDto';
import { CarImage } from '../entities/CarImage';

export interface ICarsImagesRepository {
  create(data: ICreateCarsImagesDto): Promise<CarImage>;
}
