# 1. Используем официальный образ Bun
FROM oven/bun:1.1.4

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем зависимости и устанавливаем
COPY bun.lockb package.json tsconfig*.json ./
RUN bun install

# 4. Копируем весь исходный код
COPY . .

# 5. Сборка проекта NestJS
RUN bun run build

# 6. Открываем нужный порт
EXPOSE 3000

# 7. Запуск прод-сервера
CMD ["bun", "run", "start:prod"]
