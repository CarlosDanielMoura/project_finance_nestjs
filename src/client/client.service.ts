import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClientDto: CreateClientDto, userid: string) {
    const clientAlreadyExists = await this.findByDocument(
      createClientDto.document,
    );

    if (clientAlreadyExists) {
      throw new ConflictException('Cliente já cadastrado');
    }

    await this.validateStoreExists(createClientDto.storeId);

    return await this.prismaService.client.create({
      data: {
        ...createClientDto,
        createdById: userid,
      },
    });
  }

  async findAll() {
    return await this.prismaService.client.findMany({
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findClientById(id);

    if (
      updateClientDto.document &&
      updateClientDto.document !== client.document
    ) {
      const duplicateDocument = await this.findByDocument(
        updateClientDto.document,
      );
      if (duplicateDocument) {
        throw new ConflictException('Cliente já cadastrado com este documento');
      }
    }

    if (updateClientDto.storeId && updateClientDto.storeId !== client.storeId) {
      await this.validateStoreExists(updateClientDto.storeId);
    }

    return await this.prismaService.client.update({
      where: { id },
      data: updateClientDto,
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findClientById(id);

    return await this.prismaService.client.delete({
      where: { id },
    });
  }

  private async findByDocument(document: string) {
    return await this.prismaService.client.findUnique({
      where: { document },
    });
  }

  private async findClientById(id: string) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  private async validateStoreExists(storeId: string) {
    const store = await this.prismaService.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new ConflictException('Loja não encontrada');
    }
  }
}
