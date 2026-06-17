import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
  IsPostalCode,
} from 'class-validator';
import { IsCpfOrCnpj } from '../../common/decorators/is-cpf.decorator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  road!: string;

  @IsString()
  @IsNotEmpty()
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/, {
    message: 'zipCode deve conter 8 dígitos (somente números)',
  })
  zipCode!: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'CNPJ é obrigatório' })
  @IsCpfOrCnpj()
  document!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, {
    message: 'phone deve conter 10 ou 11 dígitos (somente números)',
  })
  phone!: string;
}
