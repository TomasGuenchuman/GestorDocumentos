import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDocumentoVersionCustomDTO {
  // Eliminamos el campo 'url' de aquí.

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo PDF del documento',
  })
  file: any; // Esto es solo para que Swagger entienda que hay un archivo.

  @ApiProperty({ example: 2 })
  @Transform(({ value }) => parseInt(value, 10)) // Multer manda todo como string, hay que parsearlo
  @IsInt()
  categoriaId: number;

  @ApiProperty({ example: 5 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  entidadId: number;

  @ApiPropertyOptional({ example: true })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  requiereVencimiento?: boolean;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;
}
