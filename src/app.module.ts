import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TestModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
