import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string): Promise<Rental[]> {
    return this.rentalsRepository.findByUser(userId);
  }
}

export { ListRentalsByUserUseCase };
