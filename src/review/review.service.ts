import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review";
import { MovieService } from "../movie/movie.service";
import { PrismaService } from "../prisma/prisma.service";
import { Review } from "@prisma/client";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly movieService: MovieService,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;
    const movie = await this.movieService.findById(movieId);
    return this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: {
            id: movie.id,
          },
        },
      },
    });
  }
}
