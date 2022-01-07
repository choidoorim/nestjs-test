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
import { createProduct } from '../libs/decorator/product.decolator.controller';
import { Request } from 'express';
import { Roles } from 'src/libs/decorator/roles.decorator';
import { Role } from 'src/libs/enums/role.enum';
import { UserEntity } from './entity/user.entity';

@UseInterceptors(new LoggingInterceptor())
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('detail')
  async forbiddenException() {
    // throw new ForbiddenException();
    return { name: 'Choi' };
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
    return result;
  }

  // applyDecorators
  @createProduct()
  async createProductByDecorator(@Body() user): Promise<string> {
    throw new ForbiddenException();
    return `create Product By Decorator ${user.name}`;
  }

  @Get('roleDecorator/:roles')
  @Roles(Role.Admin)
  roleDecoratorsTest() {
    return `Role Decorator Test`;
  }

  @Get('serialization')
  serializationTest() {
    return new UserEntity({
      id: 1,
      name: 'choi',
      age: 26,
      pw: 'asdasdasd',
      product: {
        name: 'test',
        price: 24000,
      },
    });
  }

  @Post()
  async createProduct(
    @Body() createProductInfo: CreateProductDto,
  ): Promise<Product[]> {
    return this.productService.createProduct(createProductInfo);
  }
}
