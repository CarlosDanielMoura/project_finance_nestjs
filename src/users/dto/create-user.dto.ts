/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { Roles } from '../../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  Role!: Roles;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  storeIds?: string[];
}
