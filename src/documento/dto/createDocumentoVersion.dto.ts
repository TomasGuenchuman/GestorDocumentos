import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateDocumentoVersionDTO {
  @ApiPropertyOptional({
    description: 'Fecha de vencimiento del documento',
    example: '2026-12-31T23:59:59.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'La fecha de vencimiento debe tener un formato válido (ISO 8601)',
    },
  )
  fecha_vencimiento?: string | null;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo PDF del documento',
  })
  file: any; // Esto es solo para que Swagger entienda que hay un archivo.

  @ApiProperty({
    description: 'ID del documento existente',
    example: 1,
  })
  // Intercepta el string que manda Multer y lo convierte a entero
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'El ID del documento es obligatorio' })
  @IsInt({ message: 'El ID del documento debe ser un número entero' })
  @IsPositive({ message: 'El ID del documento debe ser mayor a 0' })
  documentoId!: number;
}
