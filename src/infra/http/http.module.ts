import { Module } from '@nestjs/common';
import { AccountModule } from './accounts/module';

@Module({
  imports: [AccountModule],
})
export class HttpModule {}
