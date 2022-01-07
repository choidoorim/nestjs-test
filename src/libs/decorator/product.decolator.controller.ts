import { applyDecorators, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/libs/exception/http-exception.filter';

// 내 개인적인 생각으로 applyDecorators 메서드를 통해 여러 데코레이터를 사용할 경우 더욱 더 깔끔하게 보일 수 있는 장점이 있을 것 같다.
export const createProduct = () =>
  applyDecorators(
    Post('applyDecorator'),
    UseFilters(new HttpExceptionFilter()),
  );
