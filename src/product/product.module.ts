import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [HttpModule],
  exports: [ProductService],
})
export class ProductModule {}
