// documento-version.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { DocumentoVersionService } from '../services/documentoVersion.service';
import { CreateDocumentoVersionDTO } from '../dto/createDocumentoVersion.dto';
import { CreateDocumentoVersionCustomDTO } from '../dto/createDocumentoVersionCustom.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    description: 'Subir una nueva versión de documento. Puede asociarse a un documentoId existente o crear la relación usando categoriaId + entidadId.',
    type: CreateDocumentoVersionCustomDTO, // 👈 Pasamos el DTO unificado directamente aquí
  })
  @ApiConsumes('multipart/form-data') // ⚠️ Fundamental para aceptar archivos
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // Ruta donde se guardará. En un home server en Linux,
        // podrías usar algo como '/var/www/uploads' o una ruta relativa al proyecto.
        destination: './uploads/documentos',
        filename: (req, file, callback) => {
          // Generamos un nombre único para evitar colisiones
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateDocumentoVersionDTO | CreateDocumentoVersionCustomDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('El archivo es obligatorio');
    }

    return this.documentoVersionService.create(dto, file.path);
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
