import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
} from '@nestjs/swagger';

interface DocInterface {
  summary: string;
  description?: string;
  deprecated?: boolean;
  okRes?: ApiResponseOptions;
  createdRes?: ApiResponseOptions;
}

export const docs = ({ summary, description, okRes = {} }: DocInterface) => {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiOkResponse(okRes),
  );
};
