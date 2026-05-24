import { Roles } from 'generated/prisma/enums';

export interface IAuthPayload {
  name: string;
  sub: string;
  email: string;
  role: Roles;
  iat: number;
  exp: number;
}
