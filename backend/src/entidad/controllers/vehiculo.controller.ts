import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehiculoService } from '../services/vehiculo.service';
import { createVehiculoDTO } from '../dto/createVehiculoDTO.dto';
import { UpdateVehiculoDto } from '../dto/UpdateVehiculoDto.dto';

@Controller('vehiculos') // <--- Ruta específica
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  crear(@Body() dto: createVehiculoDTO) {
    return this.vehiculoService.crearVehiculo(dto);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateVehiculo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }
}
