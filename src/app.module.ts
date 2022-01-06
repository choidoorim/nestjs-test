import { Module, ValidationPipe } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { ProductModule } from './product/product.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TestModule, ProductModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
