// src/entidad/dto/update-vehiculo.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateVehiculoDto {
  @IsOptional()
  @IsString()
  patente?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  modelo?: string;
}
