import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IAuthPayload } from './interface/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload: IAuthPayload = await this.jwtService.verify(token, {
        algorithms: ['HS256'],
      });

      const user = await this.prismaService.users.findUnique({
        where: { email: payload.email },
        include: {
          userStores: true,
        },
        omit: {
          password: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;
      return true;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid token', { cause: e });
    }

    return true;
  }
}
