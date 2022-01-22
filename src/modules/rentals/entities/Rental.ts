import { v4 as uuid } from 'uuid';

class Rental {
  id?: string;

  car_id: string;

  user_id: string;

  start_date: Date;

  end_date: Date;

  expected_return_date: Date;

  total: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.start_date = new Date();
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}

export { Rental };
