import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle("Nest Course Auth API")
    .setDescription("API documentation for Nest course")
    .setVersion("1.0.0")
    .setContact("Pricidon", "https://pricidon.ru", "dddbjjk6@gmail.com")
    .addBearerAuth()
    .build();
}
