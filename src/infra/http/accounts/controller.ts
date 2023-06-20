import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { TransferDto } from './dtos/transfer.dto';
import { AddBalance } from 'src/core/use-cases/account/add-balance.use-case';
import { AddBalanceDto } from './dtos/add-balance.dto';
import { GetBalance } from 'src/core/use-cases/account/get-balance.use-case';
import { SubtractBalance } from 'src/core/use-cases/account/subtract-blanace.use-case';
import { Transfer } from 'src/core/use-cases/account/transfer.use-case';

@Controller('accounts')
export class AccountController {
  constructor(
    private getBalanceUseCase: GetBalance,
    private addBalanceUseCase: AddBalance,
    private subtractBalanceUseCase: SubtractBalance,
    private transferUseCase: Transfer,
  ) {}

  @Get('/:id/balance')
  async getBalance(@Param('id', ParseIntPipe) accountId: number) {
    const balance = await this.getBalanceUseCase.execute(accountId);

    return { balance };
  }

  @Patch('add-balance')
  async addBalance(@Body() body: AddBalanceDto) {
    await this.addBalanceUseCase.execute(body.accountId, body.amount);

    return { message: 'Balance added successfully' };
  }

  @Patch('subtract-balance')
  async subtractBalance(@Body() body: AddBalanceDto) {
    await this.subtractBalanceUseCase.execute(body.accountId, body.amount);

    return { message: 'Balance subtracted successfully' };
  }

  @Patch('transfer')
  async transfer(@Body() body: TransferDto) {
    await this.transferUseCase.execute(
      body.fromAccountId,
      body.toAccountId,
      body.amount,
    );

    return { message: 'Transfer completed successfully' };
  }
}
