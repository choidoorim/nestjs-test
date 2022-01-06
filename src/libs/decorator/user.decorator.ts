import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserCookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookie = request;
    console.log(data);
    return cookie;
  },
);
