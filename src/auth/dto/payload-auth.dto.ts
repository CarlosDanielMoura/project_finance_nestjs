import { Roles } from '../../../generated/prisma/enums';

export class PayloadAuthDto {
  name!: string;
  sub!: string;
  email!: string;
  role!: Roles;
  stores!: Array<{
    id: string;
    name: string;
    document: string;
  }>;
  iat!: number;
  exp!: number;
}


