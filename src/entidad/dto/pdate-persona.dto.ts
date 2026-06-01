// src/personas/dto/update-persona.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdatePersonaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  dni?: string;
}
