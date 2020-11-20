import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SET API PREFIX
  app.setGlobalPrefix('api/v1');

  // CROS
  app.enableCors();

  // SET SERVER PORT
  await app.listen(process.env.PORT);
}
bootstrap();
