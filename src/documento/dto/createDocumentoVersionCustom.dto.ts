import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateDocumentoVersionCustomDTO {
  @ApiProperty({
    description: 'URL del archivo de la versión',
    example: 'https://tu-storage.com/archivo.pdf',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'ID de la categoría para buscar o crear el documento',
    example: 2,
  })
  @IsInt()
  categoriaId: number;

  @ApiProperty({
    description: 'ID de la entidad para buscar o crear el documento',
    example: 5,
  })
  @IsInt()
  entidadId: number;

  @ApiPropertyOptional({
    description: 'Define si el documento requiere vencimiento',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  requiereVencimiento?: boolean;

  @ApiPropertyOptional({
    description: 'Fecha de vencimiento',
    example: '2026-12-31T23:59:59.000Z',
  })
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;
}
