import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {

  static init(app: INestApplication) {
    // swagger default config
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The Cloud Video Storage API Swagger Interface')
      .setVersion('0.1')
      .addTag('Cloud Video Storage')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    
    // swagger init
    SwaggerModule.setup('api', app, document);
  }

}

 