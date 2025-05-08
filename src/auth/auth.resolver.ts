import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import type { GqlContext } from "../common/interfaces/gql-context.interface";
import { AuthModel } from "./models/auth.model";
import { RegisterInput } from "./inputs/register.input";
import { LoginInput } from "./inputs/login.input";
import { UserModel } from "../user/models/user.model";
import { Authorization } from "./decorators/authorization.decorator";
import { Authorized } from "./decorators/authorized.guard";
import { User } from "@prisma/client";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Authorization()
  @Query(() => UserModel)
  getMe(@Authorized() user: User) {
    return user;
  }

  @Mutation(() => AuthModel)
  async register(
    @Context() { res }: GqlContext,
    @Args("data") input: RegisterInput,
  ) {
    return this.authService.register(res, input);
  }

  @Mutation(() => AuthModel)
  async login(@Context() { res }: GqlContext, @Args("data") input: LoginInput) {
    return this.authService.login(res, input);
  }
  @Mutation(() => AuthModel)
  async refresh(@Context() { res, req }: GqlContext) {
    return this.authService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() { res }: GqlContext) {
    return this.authService.logout(res);
  }
}
