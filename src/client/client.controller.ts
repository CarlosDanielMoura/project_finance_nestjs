import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request } from 'express';

@UseGuards(AuthGuard, RoleGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Roles('ADMIN', 'OWNER')
  create(@Body() createClientDto: CreateClientDto, @Req() req: Request) {
    return this.clientService.create(createClientDto, req.user.id);
  }

  @Get()
  @Roles('ADMIN', 'OWNER', 'FUNCIONARIO')
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'OWNER', 'FUNCIONARIO')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'OWNER')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'OWNER')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}

