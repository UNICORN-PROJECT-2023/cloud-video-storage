import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Guard } from './config/guard';
import { MainModule } from './modules/main/main.module';
import { CorsMiddleware } from './middleware/cors.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
