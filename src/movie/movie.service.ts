import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieDto } from "./dto/movie.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Movie } from "@prisma/client";

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: { isAvailable: true },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        poster: true,
        reviews: true,
      },
    });
    if (!movie || !movie.isAvailable)
      throw new NotFoundException("Фильм не найден");
    return movie;
  }

  async create(dto: MovieDto) {
    const { title, releaseYear, imageUrl, actorIds } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException("Actor not found");

    return this.prismaService.movie.create({
      data: {
        title,
        poster: imageUrl ? { create: { url: imageUrl } } : undefined,
        releaseYear,
        actors: {
          connect: actors.map((actor: { id: any }) => ({ id: actor.id })),
        },
      },
    });
  }

  async update(id: string, dto: MovieDto) {
    const movie = await this.findById(id);
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException("Actor not found");

    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl ? { create: { url: dto.imageUrl } } : undefined,
        actors: {
          connect: actors.map((actor: { id: any }) => ({ id: actor.id })),
        },
      },
    });

    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({
      where: {
        id,
      },
    });
    return movie.id;
  }
}
