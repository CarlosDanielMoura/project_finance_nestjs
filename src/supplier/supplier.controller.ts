import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { StoreId } from '../common/decorators/store-id.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Roles('ADMIN', 'OWNER', 'FUNCIONARIO')
  create(
    @Body() createSupplierDto: CreateSupplierDto,
    @StoreId() storeId: string,
  ) {
    return this.supplierService.create(createSupplierDto, storeId);
  }

  @Get()
  @Roles('ADMIN', 'OWNER', 'FUNCIONARIO')
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'OWNER', 'FUNCIONARIO')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'OWNER')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
    @StoreId() storeId: string,
  ) {
    return this.supplierService.update(id, updateSupplierDto, storeId);
  }

  @Delete(':id')
  @Roles('ADMIN', 'OWNER')
  remove(@Param('id') id: string, @StoreId() storeId: string) {
    return this.supplierService.remove(id, storeId);
  }
}
