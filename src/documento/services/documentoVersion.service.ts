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
import { CreateDocumentoVersionCustomDTO } from '../dto/createDocumentoVersionCustom.dto';
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
    dto: CreateDocumentoVersionDTO | CreateDocumentoVersionCustomDTO,
  ): Promise<DocumentoVersion> {
    let documento: Documento | null = null;

    /*
    CASO 1:
    Viene el DTO custom:
    {
      url,
      categoriaId,
      entidadId,
      requiereVencimiento?,
      fecha_vencimiento?
    }
  */
    if ('categoriaId' in dto && 'entidadId' in dto) {
      const existeRelacion = await this.documentoService.existeRelacion(
        dto.categoriaId,
        dto.entidadId,
      );

      if (!existeRelacion) {
        documento = await this.documentoService.create({
          categoriaId: dto.categoriaId,
          entidadId: dto.entidadId,

          // OJO: ajustá el nombre según tu DTO de DocumentoService.
          // Si tu campo se llama requiere_vencimiento, dejalo así.
          requiere_vencimiento:
            dto.requiereVencimiento ?? !!dto.fecha_vencimiento,
        });
      } else {
        documento = await this.documentoRepository.findOne({
          where: {
            categoria: { id: dto.categoriaId },
            entidad: { id: dto.entidadId },
          },
          relations: {
            categoria: true,
            entidad: true,
          },
        });
      }
    } else if ('documentoId' in dto) {
      /*
    CASO 2:
    Viene el DTO normal:
    {
      url,
      documentoId,
      fecha_vencimiento?
    }
  */
      documento = await this.documentoRepository.findOne({
        where: { id: dto.documentoId },
      });
    } else {
      /*
    Si no entró en ninguno de los dos casos,
    el body no tiene la forma esperada.
  */
      throw new BadRequestException(
        'Debe enviar documentoId o categoriaId + entidadId',
      );
    }

    if (!documento) {
      throw new NotFoundException(
        `No se pudo encontrar ni crear el documento asociado.`,
      );
    }

    const ultimaVersion = await this.documentoVersionRepository.findOne({
      where: {
        documento: { id: documento.id },
      },
      order: {
        version: 'DESC',
      },
    });

    if (documento.requiere_vencimiento && !dto.fecha_vencimiento) {
      throw new BadRequestException(
        `El documento ${documento.id} requiere una fecha de vencimiento`,
      );
    }

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
