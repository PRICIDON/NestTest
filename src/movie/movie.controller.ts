import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Movie")
@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: "Получить список фильмов",
    description: "Возвращает список со всеми фильмами",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Фильмы найдены",
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: "Получить фильм по ID",
    description: "Возвращает информацию о фильме",
  })
  @ApiQuery({ name: "year", type: "number", description: "Фильтр по году" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Фильм найден",
  })
  @ApiParam({ name: "id", type: "string", description: "ID фильма" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Фильм не найден" })
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: "Создать фильм" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string", example: "Movie Title" },
      },
    },
  })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(id);
  }
}
