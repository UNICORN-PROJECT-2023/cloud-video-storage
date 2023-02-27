import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Guard } from './config/guard';
import { MainModule } from './modules/main/main.module';

@Module({
  imports: [MainModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: Guard,
    },
  ],
  exports: [],
})
export class AppModule {}
