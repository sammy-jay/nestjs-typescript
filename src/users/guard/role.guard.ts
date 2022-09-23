import { Role } from '../enum/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestUser } from 'src/auth/interface/request-user.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<RequestUser>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
