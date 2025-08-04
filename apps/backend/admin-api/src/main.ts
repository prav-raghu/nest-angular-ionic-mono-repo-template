import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard());
  const config = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('API docs for your NestJS project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = Number(process.env.PORT ?? 3000);
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8')) as { version: string };
  await app.listen(port);
  console.info(
    `🚀 nest-angular-ionic-mono-repo-template Landscapes Customer API Running\n🔢 Version: ${packageJson.version}\n🔌 Port: ${port}`
  );
  console.info(`📃 Documentation available on http://localhost:${port}/api/docs`);
}
void bootstrap();
