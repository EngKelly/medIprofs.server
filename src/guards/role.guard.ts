import { UserRoles } from 'src/data/enums/user/userRoles';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Define the allowed roles for the current route
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    // Extract the JWT token from the authorization header
    const token: string = authorizationHeader
      ? authorizationHeader.replace('Bearer ', '')
      : null;
    if (token == null) {
      return false;
    }
    const decodedToken = this.jwtService.decode(token);
    const userRole: UserRoles = decodedToken['role'];
    let roleExist: boolean = userRole === 'admin';

    return roleExist;
  }
}
