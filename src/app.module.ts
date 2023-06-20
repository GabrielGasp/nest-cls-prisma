import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { DatabaseModule } from './infra/database/database.module';
import { AccountModule } from './infra/http/accounts/module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    DatabaseModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
