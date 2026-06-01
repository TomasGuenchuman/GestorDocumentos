import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VehiculoService } from '../services/vehiculo.service';
import { createVehiculoDTO } from '../dto/createVehiculoDTO.dto';
import { UpdateVehiculoDto } from '../dto/UpdateVehiculoDto.dto';

@Controller('vehiculos') // <--- Ruta específica
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  crear(@Body() dto: createVehiculoDTO) {
    return this.vehiculoService.crearVehiculo(dto);
  }
  @Patch('vehiculos/:id')
  updateVehiculo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }
}
