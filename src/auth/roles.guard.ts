import { Role } from '../user/type/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  //extends AuthGuard('jwt') => jwt인증을 기본적으로 상속한다. 즉, 로그인은 기본적으로 본다.
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const authenticated = await super.canActivate(context);
    //.canActivate메서드는 boolean값을 반환하는데, true면 가드가 허용하는 거, false면 가드가 접근을 막는 것임.
    if (!authenticated) {
      return false;
    }

    //우리는 @Roles데코레이터를 쓸 때@Roles(Role.Admin)이라고 쓸 건데, 니는 roles에 Role.Admin이 담겨있다는 뜻임.
    //결국 requiredRoles는 Role.Admin을 뜻하는 것
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      //이건 롤이 지정이 안됐다는 뜻이 됨!
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
