import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpfOrCnpj } from '../../common/decorators/is-cpf.decorator';

export class UpdateClientDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser um texto' })
  @MinLength(3, { message: 'Nome deve possuir no mínimo 3 caracteres' })
  @MaxLength(150, { message: 'Nome deve possuir no máximo 150 caracteres' })
  name?: string;

  @IsOptional()
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsCpfOrCnpj()
  document?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de nascimento inválida' })
  birthDate?: Date;

  @IsOptional()
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsString()
  @Length(10, 11, {
    message: 'Telefone deve possuir 10 ou 11 dígitos',
  })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @IsOptional()
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Length(8, 8, {
    message: 'CEP deve possuir 8 dígitos',
  })
  zipCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  road?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2, {
    message: 'Estado deve possuir a sigla com 2 caracteres',
  })
  state?: string;
}

