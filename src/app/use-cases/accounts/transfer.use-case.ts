import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountRepository } from 'src/app/repositories/account.repository';
import { TransactionManager } from 'src/app/repositories/transaction-manager';

@Injectable()
export class Transfer {
  constructor(
    private transactionManager: TransactionManager,
    private accountRepository: AccountRepository,
  ) {}

  async execute(from: number, to: number, amount: number): Promise<void> {
    await this.transactionManager.run(async () => {
      const fromBalance = await this.accountRepository.getBalance(from);

      if (fromBalance === null)
        throw new NotFoundException('Account not found');

      if (fromBalance < amount)
        throw new UnprocessableEntityException('Insufficient funds');

      await this.accountRepository.subtractBalance(from, amount);
      await this.accountRepository.addBalance(to, amount);
    });
  }
}
