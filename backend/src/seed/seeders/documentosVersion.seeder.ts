import { Injectable, Logger } from '@nestjs/common';
import { DocumentoVersionService } from 'src/documento/services/documentoVersion.service';
import { CreateDocumentoVersionDTO } from 'src/documento/dto/createDocumentoVersion.dto';
import documentosVersion from '../data/documentosVersion.json';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentoVersionSeeder {
  constructor(private readonly documentoService: DocumentoVersionService) {}
  private readonly logger = new Logger(DocumentoVersionSeeder.name);

  async run(): Promise<void> {
    const fileName = '1783541872655-6493941.pdf';
    const filePath = path.resolve(
      process.cwd(),
      'uploads/documentos/',
      fileName,
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`No se encontró el archivo: ${filePath}`);
    }

    const fileUrl = `/uploads/${fileName}`;

    for (const version of documentosVersion) {
      const dto: CreateDocumentoVersionDTO = {
        documentoId: version.documentoId,
        fecha_vencimiento: version.fecha_vencimiento,
        file: undefined,
      };

      try {
        await this.documentoService.create(dto, fileUrl);

        this.logger.log(
          `Versión creada para el documento ${version.documentoId}`,
        );
      } catch (error) {
        this.logger.warn(
          `No se pudo crear la versión del documento ${version.documentoId}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
    this.logger.log('Documentos cargados.');
  }
}
