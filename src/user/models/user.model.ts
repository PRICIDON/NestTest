import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User, UserRole } from "@prisma/client";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType({ description: "Модель пользователя" })
export class UserModel implements User {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    defaultValue: "john.doe@example.com",
    description: "Почта пользователя",
  })
  email: string;

  @Field(() => String, {
    defaultValue: "John",
    description: "Имя пользователя",
  })
  name: string;

  @Field(() => String, {
    defaultValue: "John",
    description: "Пароль пользователя",
  })
  password: string;

  @Field(() => UserRole, {
    defaultValue: "John",
    description: "Роль пользователя",
  })
  role: UserRole;
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
