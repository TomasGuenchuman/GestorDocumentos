import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Esta línea es la que activa la validación automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos que no estén definidos en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos de más
      transform: true, // Convierte los tipos automáticamente
    }),
  );

  //  Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gestor de Documentos')
    .setDescription('Gestión de Documentos...')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La URL será http://localhost:3000/api

  // HABILITO CORS PARA UE EL FRONT PUEDA CONECTARSE CON EL BACKEND
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite / React
      'http://localhost:3000', // otro frontend web
      'http://192.168.0.10:5173', // tu IP local si accedés desde otro dispositivo
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
