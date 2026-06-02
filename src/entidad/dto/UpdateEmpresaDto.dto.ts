// src/entidad/dto/update-empresa.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // o '@nestjs/swagger'
import { createEmpresaDTO } from './createEmpresaDTO.dto'; // Asegura la ruta correcta

export class UpdateEmpresaDto extends PartialType(createEmpresaDTO) {}
