import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Matches,
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
    description: 'Ruta o URL del archivo',
    example: 'uploads/documentos/archivo.pdf',
    maxLength: 500,
  })
  @IsString({ message: 'La ruta debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ruta del archivo es obligatoria' })
  @MaxLength(500, {
    message: 'La ruta del archivo no puede exceder los 500 caracteres',
  })
  @Matches(/^[^<>:"|?*]+$/, {
    message: 'La ruta del archivo contiene caracteres inválidos',
  })
  url!: string;

  @ApiProperty({
    description: 'ID del documento existente',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del documento es obligatorio' })
  @IsInt({ message: 'El ID del documento debe ser un número entero' })
  @IsPositive({ message: 'El ID del documento debe ser mayor a 0' })
  documentoId!: number;
}
