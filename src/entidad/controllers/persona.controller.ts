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
import { PersonaService } from '../services/persona.service';
import { createPersonaDTO } from '../dto/createPersonaDTO.dto';
import { UpdatePersonaDto } from '../dto/pdate-persona.dto';

@Controller('personas') // <--- Ruta específica
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  crear(@Body() dto: createPersonaDTO) {
    return this.personaService.crearPersona(dto);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.personaService.update(id, updatePersonaDto);
  }
}
