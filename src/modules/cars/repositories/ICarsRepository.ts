import { ICreateCarDto } from '../dtos/ICreateCarDto';

export interface ICarsRepository {
  create(data: ICreateCarDto): Promise<void>;
}
