import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString({ message: "Почта должна быть строкой" })
  @IsNotEmpty({ message: "Почта обязательна для заполнения" })
  @IsEmail({}, { message: "Некорректный формат" })
  email: string;

  @Field(() => String)
  @IsString({ message: "Пароль должен быть строкой" })
  @IsNotEmpty({ message: "Пароль обязателен для заполнения" })
  @MinLength(6, { message: "Пароль должен содержать не менее 6 символов" })
  @MaxLength(128, { message: "Пароль должен содержать не более 128 символов" })
  password: string;
}
