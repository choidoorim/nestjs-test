import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const makeSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('NestJS API Docs')
    .setDescription('NestJS API Docs Description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
