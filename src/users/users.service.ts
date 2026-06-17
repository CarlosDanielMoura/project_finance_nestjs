/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcryt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { storeIds, ...userData } = createUserDto;
    let finalStoreIds = storeIds || [];

    if (userData.Role === 'ADMIN') {
      const allStores = await this.prismaService.store.findMany({
        select: { id: true },
      });
      finalStoreIds = allStores.map((store) => store.id);
    }

    return this.prismaService.users.create({
      data: {
        ...userData,
        password: bcryt.hashSync(createUserDto.password, 10),

        userStores: {
          create: finalStoreIds.map((storeId) => ({
            storeId,
          })),
        },
      },
      include: {
        userStores: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.users.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.users.findUnique({
      where: {
        id,
      },
      include: {
        userStores: {
          include: {
            store: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.checkUserExists(id);

    if (!userExists) {
      throw new ConflictException('Usuário não encontrado');
    }
    const { password, ...restOfData } = updateUserDto;
    const dataToUpdate: any = { ...restOfData };
    if (password) {
      dataToUpdate.password = bcryt.hashSync(updateUserDto.password!, 10);
    }
    return await this.prismaService.users.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    const userExists = await this.checkUserExists(id);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!userExists.isActive) {
      throw new ConflictException('Usuário já está desativado');
    }
    return await this.prismaService.users.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private async checkUserExists(id: string) {
    return await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
  }
}
