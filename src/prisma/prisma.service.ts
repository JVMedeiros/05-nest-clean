import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  public client: PrismaClient

  constructor() {
    super({
      log: ['warn', 'error']
    })
  }

}