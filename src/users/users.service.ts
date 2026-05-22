import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcryt from 'bcrypt'


@Injectable()
export class UsersService {


  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.users.create({
      data: {
        ...createUserDto,
        password: bcryt.hashSync(createUserDto.password, 10)
      }
    })
  }

  async findAll() {

    return await this.prismaService.users.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.users.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.users.update({
      where: {
        id
      },
      data: {
        ...updateUserDto,
        password: bcryt.hashSync(updateUserDto.password!, 10)
      }
    })
  }

  async remove(id: string) {
    return await this.prismaService.users.delete({
      where: {
        id
      }
    })
  }
}
