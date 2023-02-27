import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class Guard implements CanActivate {
 
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // if endpoint doesnot have a role allow access
    if (!roles) {
      return true;
    }

    // validate role access
    return this.matchRoles(roles, req?.user?.roles || "");
  }

  private matchRoles(roles: Array<string>, userRole: string): boolean {
    const isAuthorized = roles.includes(userRole)
    return isAuthorized;
  }
}