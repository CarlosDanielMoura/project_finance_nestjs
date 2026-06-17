/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}
  async create(createStoreDto: CreateStoreDto) {
    const existingStore = await this.checkIfStoreExists(
      createStoreDto.document,
    );
    if (existingStore) {
      throw new ConflictException('Já existe uma loja com este CNPJ');
    }

    return await this.prismaService.store.create({
      data: createStoreDto,
    });
  }

  async findAll() {
    return await this.prismaService.store.findMany();
  }

  async findOne(id: string) {
    const store = await this.prismaService.store.findUnique({
      where: {
        id,
      },
      include: {
        userStores: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const existingStore = await this.checkIfStoreExistsById(id);
    if (!existingStore) {
      throw new ConflictException('Loja não encontrada');
    }

    if (
      updateStoreDto.document &&
      updateStoreDto.document !== existingStore.document
    ) {
      const duplicateDocument = await this.checkIfStoreExists(
        updateStoreDto.document,
      );
      if (duplicateDocument) {
        throw new ConflictException('Já existe uma loja com este CNPJ');
      }
    }

    return await this.prismaService.store.update({
      where: {
        id,
      },
      data: {
        ...updateStoreDto,
      },
    });
  }

  async remove(id: string) {
    const existingStore = await this.checkIfStoreExistsById(id);
    if (!existingStore) {
      throw new ConflictException('Loja não encontrada');
    }
    return await this.prismaService.store.delete({
      where: {
        id,
      },
    });
  }

  private async checkIfStoreExists(document: string) {
    return await this.prismaService.store.findUnique({
      where: {
        document,
      },
    });
  }

  private async checkIfStoreExistsById(id: string) {
    return await this.prismaService.store.findUnique({
      where: {
        id,
      },
    });
  }
}
