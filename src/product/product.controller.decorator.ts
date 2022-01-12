import { applyDecorators, Get } from '@nestjs/common';
import { docs } from 'src/libs/docs';

export const GetUserFromCache = () =>
  applyDecorators(Get('/cache/:cacheId'), docs({ summary: '요약' }));

export const Detail = () =>
  applyDecorators(
    Get('detail'),
    docs({ summary: '디테일 API', description: '요약' }),
  );
