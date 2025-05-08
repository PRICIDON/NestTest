import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserModel } from "./models/user.model";
import { Authorization } from "../auth/decorators/authorization.decorator";
import { UserRole } from "@prisma/client";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    description: "Получение всех пользователей",
    name: "getAllUsers",
  })
  async getAll() {
    return this.userService.findAll();
  }
}
