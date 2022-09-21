import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestUser } from 'src/auth/interface/request-user.interface';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestUser = context.switchToHttp().getRequest();

    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first.');
    }

    return true;
  }
}
