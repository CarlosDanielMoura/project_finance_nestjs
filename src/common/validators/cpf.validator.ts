import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpfOrCnpj', async: false })
export class IsCpfOrCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) return false;

    const document = value.replace(/\D/g, '');

    return cpf.isValid(document) || cnpj.isValid(document);
  }

  defaultMessage(): string {
    return 'CPF ou CNPJ inválido';
  }
}
