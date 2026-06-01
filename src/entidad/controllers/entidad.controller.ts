import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EntidadService } from '../services/entidad.service';

@Controller('entidades')
export class EntidadController {
  constructor(private readonly entidadService: EntidadService) {}

  @Get()
  findAll() {
    return this.entidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entidadService.findOne(id);
  }
}
