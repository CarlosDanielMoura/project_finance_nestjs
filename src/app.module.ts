import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [UsersModule, PrismaModule, StoreModule, AuthModule, ClientModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
