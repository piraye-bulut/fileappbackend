import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const decodedToken = this.authService.decodeToken(token);
    const user = await this.authService.validateUser(decodedToken.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;
    return true;
  }
}