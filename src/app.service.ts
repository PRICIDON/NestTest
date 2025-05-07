import { Body, Injectable, Post, UsePipes } from "@nestjs/common";
import { StringToLowercasePipes } from "./common/pipes/string-to-lowercase.pipes";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  @UsePipes(StringToLowercasePipes)
  @Post()
  create(@Body("title") title: string) {
    return `Movie: ${title}`;
  }
}
