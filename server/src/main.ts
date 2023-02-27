import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Guard } from './config/guard';
import { Swagger } from './config/swagger';
import { Validator } from './config/validator';

async function bootstrap() {
  // init app
  const app = await NestFactory.create(AppModule);

  // init swagger
  Swagger.init(app);

  // init dto validator
  Validator.init(app)

  // 
  // app.useGlobalGuards(new Guard());

  // start app
  await app.listen(3000);
}
bootstrap();
