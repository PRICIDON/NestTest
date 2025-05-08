import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
  @ApiProperty({
    description: "Почтовый адрес",
    example: "john.doe@example.com",
  })
  @IsString({ message: "Почта должна быть строкой" })
  @IsNotEmpty({ message: "Почта обязательна для заполнения" })
  @IsEmail({}, { message: "Некорректный формат" })
  email: string;

  @ApiProperty({
    description: "Пароль",
    example: "123456789",
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: "Пароль должен быть строкой" })
  @IsNotEmpty({ message: "Пароль обязателен для заполнения" })
  @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
  @MaxLength(128, { message: "Пароль должен содержать не более 128 символов" })
  password: string;
}
