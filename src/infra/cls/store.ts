import { ClsStore } from 'nestjs-cls';
import { PRISMA_CLIENT_KEY } from './keys';
import { Prisma } from '@prisma/client';

export interface MyClsStore extends ClsStore {
  [PRISMA_CLIENT_KEY]?: Prisma.TransactionClient;
}
