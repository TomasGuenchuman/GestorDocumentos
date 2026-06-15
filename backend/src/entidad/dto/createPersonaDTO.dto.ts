import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createPersonaDTO {
  @ApiProperty({
    description:
      'Documento Nacional de Identidad (Exactamente 8 números sin puntos)',
    example: '40123456',
  })
  @IsString({ message: 'El DNI debe ser una cadena de texto de números' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El DNI solo debe contener números' })
  dni: string;

  @ApiProperty({
    description: 'Nombre de la persona (Solo letras y espacios)',
    example: 'Juan Carlos',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo debe contener letras y espacios',
  })
  nombre: string;

  @ApiProperty({
    description: 'Apellido de la persona (Solo letras y espacios)',
    example: 'Pérez',
  })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido solo debe contener letras y espacios',
  })
  apellido: string;
}
