/* eslint-disable prettier/prettier */
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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { RequiredRoles } from '../auth/required-roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @RequiredRoles('ADMIN', 'OWNER', 'FUNCIONARIO')
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @RequiredRoles('ADMIN', 'FUNCIONARIO')
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @RequiredRoles('ADMIN', 'OWNER', 'FUNCIONARIO')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @RequiredRoles('ADMIN', 'OWNER', 'FUNCIONARIO')
  @Get('slug/:slug')
  findOneSlug(@Param('slug') slug: string) {
    return this.storeService.findOneSlug(slug);
  }

  @RequiredRoles('ADMIN', 'OWNER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @RequiredRoles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
