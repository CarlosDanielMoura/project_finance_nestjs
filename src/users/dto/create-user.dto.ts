import { Roles } from "generated/prisma/enums"

export class CreateUserDto {
    name: string
    email: string
    password: string
    Role: Roles
}
