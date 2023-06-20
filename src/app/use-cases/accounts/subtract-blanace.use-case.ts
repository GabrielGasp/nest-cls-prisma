import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/app/repositories/account.repository';

@Injectable()
export class SubtractBalance {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountId: number, amount: number): Promise<void> {
    await this.accountRepository.subtractBalance(accountId, amount);
  }
}
