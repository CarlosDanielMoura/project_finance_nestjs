import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpfOrCnpj } from '../../common/decorators/is-cpf.decorator';

export class CreateClientDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve possuir no mínimo 3 caracteres' })
  @MaxLength(150, { message: 'Nome deve possuir no máximo 150 caracteres' })
  name!: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'Documento é obrigatório' })
  @IsCpfOrCnpj()
  document!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de nascimento inválida' })
  birthDate?: Date;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @IsString()
  @Length(10, 11, {
    message: 'Telefone deve possuir 10 ou 11 dígitos',
  })
  phone!: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Length(8, 8, {
    message: 'CEP deve possuir 8 dígitos',
  })
  zipCode!: string;

  @IsString()
  @IsNotEmpty({ message: 'Rua é obrigatória' })
  @MaxLength(200)
  road!: string;

  @IsString()
  @IsNotEmpty({ message: 'Número é obrigatório' })
  @MaxLength(20)
  number!: string;

  @IsString()
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  @MaxLength(100)
  neighborhood!: string;

  @IsString()
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @MaxLength(100)
  city!: string;

  @IsString()
  @Length(2, 2, {
    message: 'Estado deve possuir a sigla com 2 caracteres',
  })
  state!: string;

  @IsString()
  @IsNotEmpty({ message: 'Loja é obrigatória' })
  storeId!: string;
}
