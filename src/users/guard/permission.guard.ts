import { Permission } from '../enum/permission.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestUser } from 'src/auth/interface/request-user.interface';

const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<RequestUser>();
      const user = request.user;

      return user?.permissions.includes(permission);
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
