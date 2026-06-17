import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto, storeId: string) {
    const supplierAlreadyExists = await this.findByDocument(
      createSupplierDto.document,
    );

    if (supplierAlreadyExists) {
      throw new ConflictException('Fornecedor já cadastrado');
    }

    await this.validateStoreExists(storeId);

    return await this.prismaService.supplier.create({
      data: {
        ...createSupplierDto,
        storeId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.supplier.findMany({
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return supplier;
  }

  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
    storeId: string,
  ) {
    const supplier = await this.findSupplierById(id);

    if (supplier.storeId !== storeId) {
      throw new ConflictException('Fornecedor não pertence à sua loja');
    }

    if (
      updateSupplierDto.document &&
      updateSupplierDto.document !== supplier.document
    ) {
      const duplicateDocument = await this.findByDocument(
        updateSupplierDto.document,
      );

      if (duplicateDocument) {
        throw new ConflictException(
          'Fornecedor já cadastrado com este documento',
        );
      }
    }

    return await this.prismaService.supplier.update({
      where: { id },
      data: updateSupplierDto,
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string, storeId: string) {
    const supplier = await this.findSupplierById(id);

    if (supplier.storeId !== storeId) {
      throw new ConflictException('Fornecedor não pertence à sua loja');
    }

    return await this.prismaService.supplier.delete({
      where: { id },
    });
  }

  private async findByDocument(document: string) {
    return await this.prismaService.supplier.findUnique({
      where: { document },
    });
  }

  private async findSupplierById(id: string) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return supplier;
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
