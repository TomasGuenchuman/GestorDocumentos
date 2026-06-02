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
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'La fecha de vencimiento debe tener un formato válido (ISO 8601)',
    },
  )
  fecha_vencimiento?: string | null; // Importante: IsDateString valida strings, no objetos Date.

  @IsString({ message: 'La ruta debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ruta del archivo es obligatoria' })
  @MaxLength(500, {
    message: 'La ruta del archivo no puede exceder los 500 caracteres',
  })
  // Regex para evitar caracteres prohibidos en nombres/rutas de archivos (Windows/Linux)
  @Matches(/^[^<>:"|?*]+$/, {
    message: 'La ruta del archivo contiene caracteres inválidos',
  })
  url!: string;

  @IsNotEmpty({ message: 'El ID del documento es obligatorio' })
  @IsInt({ message: 'El ID del documento debe ser un número entero' })
  @IsPositive({ message: 'El ID del documento debe ser mayor a 0' })
  documentoId!: number;
}
