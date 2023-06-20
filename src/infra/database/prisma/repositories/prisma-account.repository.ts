import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from 'src/core/repositories/account.repository';
import { PrismaClientManager } from '../prisma-client-manager';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private clientManager: PrismaClientManager) {}

  async getBalance(accountId: number): Promise<number | null> {
    const prisma = this.clientManager.getClient();

    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    return account?.balance ?? null;
  }

  async addBalance(accountId: number, amount: number): Promise<void> {
    const prisma = this.clientManager.getClient();

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: { increment: amount } },
    });
  }

  async subtractBalance(accountId: number, amount: number): Promise<void> {
    const prisma = this.clientManager.getClient();

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: { decrement: amount } },
    });
  }
}
