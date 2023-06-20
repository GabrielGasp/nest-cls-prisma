import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AddBalance } from 'src/core/use-cases/account/add-balance.use-case';
import { GetBalance } from 'src/core/use-cases/account/get-balance.use-case';
import { SubtractBalance } from 'src/core/use-cases/account/subtract-blanace.use-case';
import { Transfer } from 'src/core/use-cases/account/transfer.use-case';

@Module({
  controllers: [AccountController],
  providers: [GetBalance, AddBalance, SubtractBalance, Transfer],
})
export class AccountModule {}
