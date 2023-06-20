import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AddBalance } from 'src/app/use-cases/accounts/add-balance.use-case';
import { GetBalance } from 'src/app/use-cases/accounts/get-balance.use-case';
import { SubtractBalance } from 'src/app/use-cases/accounts/subtract-blanace.use-case';
import { Transfer } from 'src/app/use-cases/accounts/transfer.use-case';

@Module({
  controllers: [AccountsController],
  providers: [GetBalance, AddBalance, SubtractBalance, Transfer],
})
export class AccountModule {}
