import { ClsService } from 'nestjs-cls';
import { PRISMA_CLIENT_KEY } from 'src/infra/cls/keys';
import { MyClsStore } from 'src/infra/cls/store';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClientManager {
  constructor(
    private prisma: PrismaService,
    private cls: ClsService<MyClsStore>,
  ) {}

  /**
   * This method is used to retrieve the prisma client in the repositories.
   *
   * If the transaction client exists, it will be returned.
   *
   * If a transaction was not initiated, the default client will be returned.
   *
   * Notice that TransactionClient does not have all methods avaiable to the default client.
   * If you need methods not available in TransactionClient, it's necessary to check the instance of the returned client.
   * This should rarely be necessary when using the client in repositories.
   *
   * TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>
   */
  getClient(): Prisma.TransactionClient | PrismaService {
    const prisma = this.cls.get(PRISMA_CLIENT_KEY);
    if (prisma) {
      return prisma;
    } else {
      return this.prisma;
    }
  }
}
