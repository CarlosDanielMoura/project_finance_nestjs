import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpfOrCnpj } from '../../common/decorators/is-cpf.decorator';

export class CreateSupplierDto {
  @IsBoolean({ message: 'Ativo deve ser um booleano' })
  @IsNotEmpty({ message: 'Ativo é obrigatório' })
  active!: boolean;

  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve possuir no mínimo 3 caracteres' })
  @MaxLength(150, { message: 'Nome deve possuir no máximo 150 caracteres' })
  name!: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'Documento é obrigatório' })
  @IsCpfOrCnpj()
  document!: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsString()
  @Length(10, 11, {
    message: 'Telefone deve possuir 10 ou 11 dígitos',
  })
  phone!: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Website deve ser uma URL válida' })
  website?: string;

  @IsOptional()
  @IsString({ message: 'Nome do contato deve ser um texto' })
  @MaxLength(150, {
    message: 'Nome do contato deve possuir no máximo 150 caracteres',
  })
  nameContact?: string;

  @IsOptional()
  @IsString({ message: 'Observações deve ser um texto' })
  @MaxLength(500, {
    message: 'Observações deve possuir no máximo 500 caracteres',
  })
  observations?: string;
}
