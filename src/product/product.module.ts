import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/libs/guards/roles.guard';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [HttpModule],
  exports: [ProductService],
})
export class ProductModule {}
