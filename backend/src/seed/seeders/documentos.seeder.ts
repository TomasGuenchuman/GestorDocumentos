import { Injectable, Logger } from '@nestjs/common';
import { DocumentoService } from 'src/documento/services/documento.service';
import documentos from '../data/documentos.json';

@Injectable()
export class DocumentoSeeder {
  constructor(private readonly documentoService: DocumentoService) {}
  private readonly logger = new Logger(DocumentoSeeder.name);

  async run(): Promise<void> {
    this.logger.log(`Cargando ${documentos.length} documentos...`);

    for (const documento of documentos) {
      try {
        await this.documentoService.create({
          requiere_vencimiento: documento.requiere_vencimiento,
          categoriaId: documento.categoriaId,
          entidadId: documento.entidadId,
        });

        this.logger.log(`Documento ${documento.categoriaId} creado.`);
      } catch (error) {
        this.logger.warn(
          `No se pudo crear el documento ${documento.categoriaId}: ${error.message}`,
        );
      }
    }

    this.logger.log('Documentos cargados.');
  }
}
