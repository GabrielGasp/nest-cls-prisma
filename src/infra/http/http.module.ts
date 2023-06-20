import { Module } from '@nestjs/common';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [AccountModule],
})
export class HttpModule {}
