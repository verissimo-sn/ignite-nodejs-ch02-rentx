import { Specification } from '../entities/Specification';

interface ICreateCarDto {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
}

export { ICreateCarDto };
