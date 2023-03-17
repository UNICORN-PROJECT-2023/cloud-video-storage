import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {

  static init(app: INestApplication) {
    // swagger default config
    const config = new DocumentBuilder()
      .setTitle('Cloud Video Storage')
      .setDescription('The Cloud Video Storage API Swagger Interface')
      .setVersion('0.2')
      .addTag('Cloud Video Storage')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    
    // swagger init
    SwaggerModule.setup('api', app, document);
  }

}

 