// documento-version.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DocumentoVersionService } from '../services/documentoVersion.service';
import { CreateDocumentoVersionDTO } from '../dto/createDocumentoVersion.dto';
import { CreateDocumentoVersionCustomDTO } from '../dto/createDocumentoVersionCustom.dto';

import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiExtraModels(CreateDocumentoVersionDTO, CreateDocumentoVersionCustomDTO)
@Controller('documento-version')
export class DocumentoVersionController {
  constructor(
    private readonly documentoVersionService: DocumentoVersionService,
  ) {}

  @Post()
  @ApiBody({
    description:
      'Crear una versión usando un documento existente o usando categoría + entidad',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateDocumentoVersionDTO) },
        { $ref: getSchemaPath(CreateDocumentoVersionCustomDTO) },
      ],
    },
    examples: {
      conDocumentoExistente: {
        summary: 'Documento existente',
        value: {
          url: 'uploads/documentos/archivo.pdf',
          documentoId: 1,
          fecha_vencimiento: '2026-12-31T23:59:59.000Z',
        },
      },
      conCategoriaYEntidad: {
        summary: 'Sin documento Existente',
        value: {
          url: 'uploads/documentos/archivo.pdf',
          categoriaId: 2,
          entidadId: 5,
          requiereVencimiento: true,
          fecha_vencimiento: '2026-12-31T23:59:59.000Z',
        },
      },
    },
  })
  create(
    @Body() dto: CreateDocumentoVersionDTO | CreateDocumentoVersionCustomDTO,
  ) {
    return this.documentoVersionService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentoVersionService.findAll();
  }

  // ⚠️ IMPORTANTE: esta ruta va antes que ':id'
  @Get('documento/:documentoId')
  findByDocumento(@Param('documentoId', ParseIntPipe) documentoId: number) {
    return this.documentoVersionService.findByDocumento(documentoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentoVersionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentoVersionService.remove(id);
  }
}
