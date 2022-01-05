import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { ProductService, Product } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ForbiddenException } from '../libs/exception/forbidden.exception';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('detail')
  async forbiddenException() {
    throw new ForbiddenException();
    return 'Hello';
  }

  @Get('test')
  async findProductByQuery(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    productId: number,
  ) {
    const result = await this.productService.findProductById(productId);
    return result;
  }

  @Post()
  async createProduct(
    @Body() createProductInfo: CreateProductDto,
  ): Promise<Product[]> {
    return this.productService.createProduct(createProductInfo);
  }
}
