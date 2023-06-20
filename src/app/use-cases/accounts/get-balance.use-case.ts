import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from 'src/app/repositories/account.repository';

@Injectable()
export class GetBalance {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountId: number): Promise<number> {
    const balance = await this.accountRepository.getBalance(accountId);

    if (!balance) {
      throw new NotFoundException('Account not found');
    }

    return balance;
  }
}
