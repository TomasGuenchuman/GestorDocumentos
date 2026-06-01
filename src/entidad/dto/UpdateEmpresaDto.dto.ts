// src/entidad/dto/update-empresa.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  razonSocial?: string;

  @IsOptional()
  @IsString()
  cuit?: string;
}
