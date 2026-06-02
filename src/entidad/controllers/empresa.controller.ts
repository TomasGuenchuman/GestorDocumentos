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
import { EmpresaService } from '../services/empresa.service';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';
import { UpdateEmpresaDto } from '../dto/UpdateEmpresaDto.dto';

@Controller('empresas') // <--- Ruta específica
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  crear(@Body() dto: createEmpresaDTO) {
    return this.empresaService.crearEmpresa(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateEmpresa(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresaService.update(id, updateEmpresaDto);
  }
}
