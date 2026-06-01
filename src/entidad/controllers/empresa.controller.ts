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
import { EmpresaService } from '../services/empresa.service';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';
import { UpdateEmpresaDto } from '../dto/UpdateEmpresaDto.dto';

@Controller('empresas') // <--- Ruta específica
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  crear(@Body() dto: createEmpresaDTO) {
    return this.empresaService.crearEmpresa(dto);
  }

  @Patch(':id')
  updateEmpresa(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresaService.update(id, updateEmpresaDto);
  }
}
