import { Controller, Get } from '@nestjs/common';
import { EntidadService } from '../services/entidad.service';

@Controller('entidades')
export class EntidadController {
  constructor(private readonly entidadService: EntidadService) {}

  @Get()
  findAll() {
    return this.entidadService.findAll();
  }
}
