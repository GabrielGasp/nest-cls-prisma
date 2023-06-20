import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    DatabaseModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
