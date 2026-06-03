// documento-version.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoVersion } from '../entities/documentoVersion.entity';
import { Documento } from '../entities/documento.entity';
import { CreateDocumentoVersionDTO } from '../dto/createDocumentoVersion.dto';
import { DocumentoService } from './documento.service';

@Injectable()
export class DocumentoVersionService {
  constructor(
    @InjectRepository(DocumentoVersion)
    private readonly documentoVersionRepository: Repository<DocumentoVersion>,

    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,

    private readonly documentoService: DocumentoService,
  ) {}

  async create(
    dto: CreateDocumentoVersionDTO,
    categoriaId?: number,
    entidadId?: number,
    requiereVencimiento?: boolean,
  ): Promise<DocumentoVersion> {
    let documento: Documento | null = null;

    // 2. Si se envían los parámetros opcionales, manejamos la creación o búsqueda
    if (categoriaId && entidadId) {
      const existeRelacion = await this.documentoService.existeRelacion(
        categoriaId,
        entidadId,
      );

      if (!existeRelacion) {
        // Usamos el método create de DocumentoService
        documento = await this.documentoService.create({
          categoriaId,
          entidadId,
          // Inferimos el vencimiento si no se pasa explícitamente, o usamos el valor de la nueva versión
          requiere_vencimiento: requiereVencimiento ?? !!dto.fecha_vencimiento,
        });
      } else {
        // Si ya existe la relación, buscamos el documento para poder asignarlo a la versión
        documento = await this.documentoRepository.findOne({
          where: {
            categoria: { id: categoriaId },
            entidad: { id: entidadId },
          },
        });
      }
    } else if (dto.documentoId) {
      // 3. Flujo original: si no hay parámetros opcionales, buscamos por el ID del DTO
      documento = await this.documentoRepository.findOne({
        where: { id: dto.documentoId },
      });
    }

    // Validamos que hayamos conseguido un documento por una vía u otra
    if (!documento) {
      throw new NotFoundException(
        `No se pudo encontrar ni crear el documento asociado.`,
      );
    }

    // 4. Lógica para buscar la versión anterior
    const ultimaVersion = await this.documentoVersionRepository.findOne({
      where: {
        documento: { id: documento.id }, // Usamos el ID del documento obtenido dinámicamente
      },
      order: {
        version: 'DESC', // NOTA: Agregué este ordenamiento para asegurar que siempre traiga la versión más alta y no una aleatoria.
      },
    });

    if (documento.requiere_vencimiento) {
      if (!dto.fecha_vencimiento) {
        throw new BadRequestException(
          `El documento ${documento.id} requiere una fecha de vencimiento`,
        );
      }
    }

    // 5. Creación normal de la versión
    const documentoVersion = this.documentoVersionRepository.create({
      fecha_vencimiento: documento.requiere_vencimiento
        ? dto.fecha_vencimiento
        : null,
      version: ultimaVersion ? ultimaVersion.version + 1 : 1,
      url: dto.url,
      documento,
    });

    return this.documentoVersionRepository.save(documentoVersion);
  }
  async findAll(): Promise<DocumentoVersion[]> {
    return this.documentoVersionRepository.find({
      relations: {
        documento: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<DocumentoVersion> {
    const documentoVersion = await this.documentoVersionRepository.findOne({
      where: { id },
      relations: {
        documento: true,
      },
    });

    if (!documentoVersion) {
      throw new NotFoundException(`No existe una versión con id ${id}`);
    }

    return documentoVersion;
  }

  async findByDocumento(documentoId: number): Promise<DocumentoVersion[]> {
    return this.documentoVersionRepository.find({
      where: {
        documento: { id: documentoId },
      },
      relations: {
        documento: true,
      },
      order: {
        version: 'DESC',
      },
    });
  }

  async remove(id: number): Promise<void> {
    const documentoVersion = await this.findOne(id);

    await this.documentoVersionRepository.remove(documentoVersion);
  }
}
