import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DECORATOR_KEY, RESPONSE_MESSAGE } from 'src/common/constants';
import { ROLE } from 'src/common/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(
      DECORATOR_KEY.ROLES,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('request', request);
    const havPermission = requiredRoles.some(
      (role) => role === request?.user?.role,
    );
    console.log('havPermission', havPermission);
    if (havPermission) {
      return true;
    } else {
      throw new HttpException(
        RESPONSE_MESSAGE.PERMISSION_DENIED,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
