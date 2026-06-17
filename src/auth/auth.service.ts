import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.users.findUnique({
      where: {
        email: loginDto.email,
      },
      include: {
        userStores: {
          include: {
            store: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const stores = user.userStores.map((us) => ({
      id: us.store.id,
      name: us.store.name,
      document: us.store.document,
    }));

    const token = this.jwtService.sign({
      name: user.name,
      userId: user.id,
      email: user.email,
      role: user.Role,
      stores,
    });

    return { access_token: token, stores };
  }
}
