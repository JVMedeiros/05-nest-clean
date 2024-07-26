import { Body, Controller, Post, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException('Email already registered')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
  }
}