import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {

  constructor(private prismaService: PrismaService) { }
  async create(createStoreDto: CreateStoreDto) {

    return await this.prismaService.store.create({
      data: createStoreDto
    });
  }

  async findAll() {
    return await this.prismaService.store.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.store.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return await this.prismaService.store.update({
      where: {
        id
      },
      data: {
        ...updateStoreDto
      }
    })
  }

  async remove(id: string) {
    return await this.prismaService.store.delete({
      where: {
        id
      }
    })
  }
}
