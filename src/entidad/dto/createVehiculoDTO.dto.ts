import {
  IsString,
  IsNotEmpty,
  Matches,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createVehiculoDTO {
  @ApiProperty({
    description: 'Patente o matrícula del vehículo (Máximo 10 caracteres)',
    example: 'AF123JK',
  })
  @IsString({ message: 'La patente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La patente no puede estar vacía' })
  @MaxLength(10, { message: 'La patente no puede superar los 10 caracteres' })
  patente: string;

  @ApiProperty({
    description: 'Marca del vehículo (Solo letras y espacios)',
    example: 'Ford',
  })
  @IsString({ message: 'La marca debe ser un texto' })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'La marca solo debe contener letras y espacios',
  })
  marca: string;

  @ApiProperty({
    description: 'Modelo del vehículo (Acepta letras, números y espacios)',
    example: 'Ranger T6 3.2',
  })
  @IsString({ message: 'El modelo debe ser un texto' })
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  @Matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El modelo solo debe contener letras, números y espacios',
  })
  modelo: string;
}
