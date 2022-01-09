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
import { UserResponseDto } from './dto/userResponse.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import {
  ProductDetailRequestDto,
  ProductDetailResponseDto,
} from './dto/product-detail.dto';

@UseInterceptors(new LoggingInterceptor())
@Controller('product')
@ApiTags('상품 API')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('detail')
  @ApiOperation({ summary: 'detail API', description: '성을 return 한다.' })
  @ApiCreatedResponse({
    description: '성 return',
    type: ProductDetailResponseDto,
  })
  async forbiddenException(@Body() product: ProductDetailRequestDto) {
    // throw new ForbiddenException();
    const result: ProductDetailResponseDto = {
      id: 1,
      name: product.name,
    };
    return result;
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
    return new UserResponseDto({
      id: 1,
      name: 'choi',
      age: 26,
      pw: 'asdasdasd',
    });
  }

  @Post()
  async createProduct(
    @Body() createProductInfo: CreateProductDto,
  ): Promise<Product[]> {
    return this.productService.createProduct(createProductInfo);
  }
}
