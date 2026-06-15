// src/vehiculos/dto/update-vehiculo.dto.ts
import { PartialType } from '@nestjs/swagger';
import { createVehiculoDTO } from './createVehiculoDTO.dto'; // Revisa que la ruta coincida con tu estructura

export class UpdateVehiculoDto extends PartialType(createVehiculoDTO) {}
