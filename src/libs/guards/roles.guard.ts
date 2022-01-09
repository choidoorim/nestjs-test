import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/role.enum';

// 미들웨어도 Authentication 에 좋은 기능이지만 next function 이후에 어떤 핸들러가 실행될지 모릅니다. 하지만 Guards 는 다음에 어떤 것이 실행될 지 알 수 있다.
// Guard 는 모든 moddleware 의 다음에 실행되고, interceptor 나 pipe 이전에 실행된다.
// Guard 는 CanActivate interface 를 반드시 implement 해야 한다.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRoles = request.params.roles;
    console.log(roles[0], userRoles);
    const matchRoles = (roles, userRoles) => {
      return roles === userRoles;
    };

    return matchRoles(roles[0], userRoles);
  }
}
