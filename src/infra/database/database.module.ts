import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AccountRepository } from 'src/core/repositories/account.repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account.repository';
import { PrismaTransactionManager } from './prisma/prisma-transaction-manager.service';
import { TransactionManager } from 'src/core/repositories/transaction-manager';
import { PrismaClientManager } from './prisma/prisma-client-manager';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaClientManager,
    { provide: TransactionManager, useClass: PrismaTransactionManager },
    { provide: AccountRepository, useClass: PrismaAccountRepository },
  ],
  exports: [TransactionManager, AccountRepository],
})
export class DatabaseModule {}
