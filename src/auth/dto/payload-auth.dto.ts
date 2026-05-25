import { Roles } from 'generated/prisma/enums';

export class PayloadAuthDto {
  name: string;
  sub: string;
  email: string;
  role: Roles;
  iat: number;
  exp: number;
}
