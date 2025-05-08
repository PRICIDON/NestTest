import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterRequest } from "./dto/register.dto";
import { LoginRequest } from "./dto/login.dto";
import { Request, Response } from "express";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthResponse } from "./dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { Authorization } from "./decorators/authorization.decorator";
import { Authorized } from "./decorators/authorized.decorator";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Создание аккаунта" })
  @ApiOkResponse({ type: AuthResponse })
  @ApiConflictResponse({
    description: "Пользователь с такой почтой уже существует",
  })
  @ApiBadRequestResponse({ description: "Некорректные входные данные" })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: "Вход в аккаунта",
    description: "Авторизует пользователя и выдает токен доступа",
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiNotFoundResponse({
    description: "Пользователь не найден",
  })
  @ApiBadRequestResponse({ description: "Некорректные входные данные" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }
  @ApiOperation({
    summary: "Обновление токена",
    description: "Генерирует новый токен доступа",
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: "Недействительный refresh-токен" })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({ summary: "Выход из аккаунта" })
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get("@me")
  async me(@Authorized() user: User) {
    return user;
  }
}
