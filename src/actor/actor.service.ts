import { Injectable } from "@nestjs/common";
import { CreateActorDto } from "./dto/create-actor.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto) {
    const { name } = dto;
    const actor = await this.prismaService.actor.create({
      data: {
        name,
      },
    });
    return actor;
  }
}
