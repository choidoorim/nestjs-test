import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  Post,
  Body,
  HttpStatus,
  ParseArrayPipe,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './type/product.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { ForbiddenException } from '../libs/exception/forbidden.exception';
import { LoggingInterceptor } from '../libs/logging.interceptor';
import { UserCookie } from 'src/libs/decorator/user.decorator';
import { createProduct } from './product.decolator.controller';
import { Request } from 'express';

@UseInterceptors(new LoggingInterceptor())
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('detail')
  async forbiddenException() {
    // throw new ForbiddenException();
    return 'Hello';
  }

  @Get('numberValidation')
  async numberValidationTest(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ): Promise<number[]> {
    return ids;
  }

  // createParamDecorator
  @Get('customDecorator')
  async customDecoratorTest(@UserCookie('firstName') userCookie) {
    console.log(userCookie);
  }

  @Get('cookies')
  async cookiesTest(@Req() request: Request) {
    console.log(request.cookies);
  }

  @Get('pipe')
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

  @Get('axios')
  async axiosTest() {
    const result = await this.productService.axiosTest();
    console.log(result);
    return `AxiosResult is ${result}`;
  }

  // applyDecorators
  @createProduct()
  async createProductByDecorator(@Body() user): Promise<string> {
    throw new ForbiddenException();
    return `create Product By Decorator ${user.name}`;
  }

  @Post()
  async createProduct(
    @Body() createProductInfo: CreateProductDto,
  ): Promise<Product[]> {
    return this.productService.createProduct(createProductInfo);
  }
}
