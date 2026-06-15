// src/personas/dto/update-persona.dto.ts
import { PartialType } from '@nestjs/swagger';
import { createPersonaDTO } from './createPersonaDTO.dto'; // Ajusta la ruta si es necesario

export class UpdatePersonaDto extends PartialType(createPersonaDTO) {}
