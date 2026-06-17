import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsCpfOrCnpjConstraint } from '../validators/cpf.validator';

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCpfOrCnpjConstraint,
    });
  };
}
