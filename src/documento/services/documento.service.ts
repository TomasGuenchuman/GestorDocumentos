import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, FindOptionsWhere } from 'typeorm';

import {
  Documento,
  DocumentoConUltimaVersion,
} from '../entities/documento.entity';
import { CreateDocumentoDTO } from '../dto/createDocumentoDTO.dto';
import { Categoria } from '../entities/categoria.entity';
import { Entidad } from 'src/entidad/entities/entidad.entity';
import { EntidadService } from 'src/entidad/services/entidad.service';
import { UpdateDocumentoDto } from '../dto/updateDocumento.dto';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Entidad)
    private readonly entidadRepository: Repository<Entidad>,

    private readonly entidadService: EntidadService,
  ) {}

  async create(dto: CreateDocumentoDTO): Promise<Documento> {
    const existeRelacion = await this.documentoRepository.findOne({
      where: {
        categoria: { id: dto.categoriaId },
        entidad: { id: dto.entidadId },
      },
      relations: ['categoria', 'entidad'],
    });

    if (existeRelacion) {
      throw new BadRequestException(
        'Ya existe un documento para esa categoría y entidad',
      );
    }

    const categoria = await this.categoriaRepository.findOne({
      where: { id: dto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría con ID ${dto.categoriaId} no encontrada`,
      );
    }

    const entidad = await this.entidadRepository.findOne({
      where: { id: dto.entidadId },
    });

    if (!entidad) {
      throw new NotFoundException(
        `Entidad con ID ${dto.entidadId} no encontrada`,
      );
    }

    if (categoria.tipo !== entidad.tipo) {
      throw new BadRequestException(
        'El tipo de la categoría no coincide con el tipo de la entidad',
      );
    }

    const nombreEntidad = await this.entidadService.getNombreSegunTipo(
      dto.entidadId,
    );
    const documento = this.documentoRepository.create({
      nombre: categoria.nombre + '-' + nombreEntidad,
      requiere_vencimiento: dto.requiere_vencimiento,
      categoria,
      entidad,
    });

    return await this.documentoRepository.save(documento);
  }

  async findAll(): Promise<Documento[]> {
    return await this.documentoRepository.find({
      relations: ['categoria', 'entidad'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Documento> {
    const documento = await this.documentoRepository.findOne({
      where: { id },
      relations: ['categoria', 'entidad'],
    });

    if (!documento) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    return documento;
  }

  async update(id: number, dto: UpdateDocumentoDto): Promise<Documento> {
    // 1. Buscar el documento existente
    const documento = await this.documentoRepository.findOne({
      where: { id },
      relations: ['categoria', 'entidad'],
    });

    if (!documento) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    // Si no se envió ningún dato a actualizar, retornamos el documento tal cual
    if (Object.keys(dto).length === 0) return documento;

    let categoria = documento.categoria;
    let entidad = documento.entidad;
    let requiereRegenerarNombre = false;

    // 2. Validar cambios en las relaciones si se enviaron en el DTO
    if (dto.categoriaId || dto.entidadId) {
      const categoriaId = dto.categoriaId ?? categoria.id;
      const entidadId = dto.entidadId ?? entidad.id;

      // Validar unicidad (que no exista OTRO documento con la misma combinación)
      const existeRelacion = await this.documentoRepository.findOne({
        where: {
          categoria: { id: categoriaId },
          entidad: { id: entidadId },
          id: Not(id), // Ignoramos el documento actual
        },
      });

      if (existeRelacion) {
        throw new BadRequestException(
          'Ya existe otro documento para esa categoría y entidad',
        );
      }

      // Si cambió la categoría, la validamos y obtenemos
      if (dto.categoriaId) {
        const nuevaCategoria = await this.categoriaRepository.findOne({
          where: { id: dto.categoriaId },
        });
        if (!nuevaCategoria) {
          throw new NotFoundException(
            `Categoría con ID ${dto.categoriaId} no encontrada`,
          );
        }
        categoria = nuevaCategoria;
        requiereRegenerarNombre = true;
      }

      // Si cambió la entidad, la validamos y obtenemos
      if (dto.entidadId) {
        const nuevaEntidad = await this.entidadRepository.findOne({
          where: { id: dto.entidadId },
        });
        if (!nuevaEntidad) {
          throw new NotFoundException(
            `Entidad con ID ${dto.entidadId} no encontrada`,
          );
        }
        entidad = nuevaEntidad;
        requiereRegenerarNombre = true;
      }

      // Validar coincidencia de tipos
      if (categoria.tipo !== entidad.tipo) {
        throw new BadRequestException(
          'El tipo de la categoría no coincide con el tipo de la entidad',
        );
      }
    }

    // 3. Aplicar los cambios al documento
    if (dto.requiere_vencimiento !== undefined) {
      documento.requiere_vencimiento = dto.requiere_vencimiento;
    }

    if (requiereRegenerarNombre) {
      const nombreEntidad = await this.entidadService.getNombreSegunTipo(
        entidad.id,
      );
      documento.nombre = categoria.nombre + '-' + nombreEntidad;
      documento.categoria = categoria;
      documento.entidad = entidad;
    }

    // 4. Guardar y retornar
    return await this.documentoRepository.save(documento);
  }

  async existeRelacion(
    categoriaId: number,
    entidadId: number,
  ): Promise<boolean> {
    const whereClause: FindOptionsWhere<Documento> = {
      categoria: { id: categoriaId },
      entidad: { id: entidadId },
    };

    return await this.documentoRepository.exists({
      where: whereClause,
    });
  }

  async findByCategoriaAndEntidad(
    categoriaId: number,
    entidadId: number,
  ): Promise<Documento> {
    const documento = await this.documentoRepository.findOne({
      where: {
        categoria: { id: categoriaId },
        entidad: { id: entidadId },
      },
      relations: ['categoria', 'entidad'],
    });

    if (!documento) {
      throw new NotFoundException(
        `No existe documento para la categoría ${categoriaId} y la entidad ${entidadId}`,
      );
    }

    return documento;
  }

  async findAllWithLatestVersion(): Promise<DocumentoConUltimaVersion[]> {
    const [documentos, entidades] = await Promise.all([
      this.documentoRepository.find({
        relations: {
          categoria: true,
          entidad: true,
          versiones: true,
        },
        order: {
          id: 'ASC',
          versiones: {
            version: 'DESC',
            id: 'DESC',
          },
        },
      }),

      // Usa aquí el nombre real de tu método especial de entidades
      this.entidadService.findAll(),
    ]);

    const entidadesPorId = new Map(
      entidades.map((entidad) => [entidad.id, entidad]),
    );

    return documentos.map((documento) => {
      const { versiones, ...documentoSinVersiones } = documento;

      const ultimaVersion = versiones?.[0] ?? null;

      const entidadCompleta = entidadesPorId.get(documento.entidad.id);

      return {
        ...documentoSinVersiones,

        entidad: entidadCompleta
          ? {
              id: entidadCompleta.id,
              tipo: entidadCompleta.tipo,
              detalle: entidadCompleta.detalle,
            }
          : documento.entidad,

        ultimaVersion: ultimaVersion
          ? {
              id: ultimaVersion.id,
              fecha_vencimiento: ultimaVersion.fecha_vencimiento ?? null,
              version: ultimaVersion.version,
              url: ultimaVersion.url,
            }
          : null,
      };
    });
  }
}
