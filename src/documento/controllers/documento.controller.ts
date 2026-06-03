import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { DocumentoService } from '../services/documento.service';
import { CreateDocumentoDTO } from '../dto/createDocumentoDTO.dto';
import { Documento } from '../entities/documento.entity';
import { UpdateDocumentoDto } from '../dto/updateDocumento.dto';

@Controller('documentos')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  // POST /documentos
  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateDocumentoDTO): Promise<Documento> {
    return await this.documentoService.create(dto);
  }

  // GET /documentos
  @Get()
  async findAll(): Promise<Documento[]> {
    return await this.documentoService.findAll();
  }

  // GET /documentos/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Documento> {
    return await this.documentoService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentoService.update(id, updateDocumentoDto);
  }

  // GET /documentos/existe-relacion/:categoriaId/:entidadId
  @Get('existe-relacion/:categoriaId/:entidadId')
  async existeRelacion(
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<boolean> {
    return await this.documentoService.existeRelacion(categoriaId, entidadId);
  }
}
