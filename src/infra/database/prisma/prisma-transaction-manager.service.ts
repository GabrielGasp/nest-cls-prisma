import { ClsService } from 'nestjs-cls';
import { PrismaService } from './prisma.service';
import { MyClsStore } from 'src/infra/cls/store';
import { PRISMA_CLIENT_KEY } from 'src/infra/cls/keys';
import { TransactionManager } from 'src/core/repositories/transaction-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTransactionManager implements TransactionManager {
  constructor(
    private prisma: PrismaService,
    private cls: ClsService<MyClsStore>,
  ) {}

  /**
   * This method is used to run a callback inside a transaction.
   *
   * If a transaction was already initiated, the callback will be executed inside said transaction.
   *
   * @param fn  The callback that will be executed inside the transaction
   * @returns The return value of the callback
   */
  async run<T>(fn: () => Promise<T>): Promise<T> {
    // if the Transaction Client
    if (this.cls.has(PRISMA_CLIENT_KEY)) {
      // exists, there is no need to create a transaction and you just execute the callback
      const result = await fn();
      return result;
    } else {
      // does not exist, create a Prisma transaction
      return this.prisma.$transaction(async (prisma) => {
        // and save the Transaction Client inside the CLS namespace to be retrieved by the repositories
        this.cls.set(PRISMA_CLIENT_KEY, prisma);

        try {
          // execute the transaction callback
          const result = await fn();

          // unset the transaction client when everything goes well
          this.cls.set(PRISMA_CLIENT_KEY, undefined);

          return result;
        } catch (err) {
          // unset the transaction client when something goes wrong
          this.cls.set(PRISMA_CLIENT_KEY, undefined);
          throw err;
        }
      });
    }
  }
}
