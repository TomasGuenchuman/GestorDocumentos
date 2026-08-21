import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

import { Persona } from '../entities/persona.entity';
import { Vehiculo } from '../entities/vehiculo.entity';
import { Empresa } from '../entities/empresa.entity';
import { Documento } from 'src/documento/entities/documento.entity';
import { DocumentoVersion } from 'src/documento/entities/documentoVersion.entity';
import { DocumentStatusRule } from '../rules/document-status.rule';

type NombreSegunTipoRaw = {
  tipo: TipoEntidad;
  nombre: string | null;
  apellido: string | null;
  patente: string | null;
  razonSocial: string | null;
};

@Injectable()
export class EntidadService {
  constructor(
    @InjectRepository(Entidad)
    private readonly entidadRepository: Repository<Entidad>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,

    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    private readonly documentStatusRule: DocumentStatusRule,
  ) {}

  async getNombreSegunTipo(entidadId: number): Promise<string> {
    // Hacemos un JOIN manual de todas las posibles tablas "hijas" usando el ID
    const resultado = await this.entidadRepository
      .createQueryBuilder('entidad')
      .leftJoinAndSelect('persona', 'p', 'p.id = entidad.id')
      .leftJoinAndSelect('vehiculo', 'v', 'v.id = entidad.id')
      .leftJoinAndSelect('empresa', 'e', 'e.id = entidad.id')
      .select([
        'entidad.tipo AS tipo',
        'p.nombre AS nombre',
        'p.apellido AS apellido',
        'v.patente AS patente',
        'e.razonSocial AS razonSocial',
      ])
      .where('entidad.id = :id', { id: entidadId })
      .getRawOne<NombreSegunTipoRaw>(); // Usamos getRawOne porque estamos aplanando las tablas hijas en un solo objeto

    if (!resultado) {
      throw new NotFoundException(`Entidad con ID ${entidadId} no encontrada`);
    }

    // Ahora evaluamos el resultado plano que devolvió la base de datos
    switch (resultado.tipo) {
      case TipoEntidad.PERSONA:
        if (!resultado.nombre)
          throw new NotFoundException(`Detalle de Persona no encontrado`);
        return `${resultado.apellido} ${resultado.nombre}`;

      case TipoEntidad.VEHICULO:
        if (!resultado.patente)
          throw new NotFoundException(`Detalle de Vehículo no encontrado`);
        return resultado.patente;

      case TipoEntidad.EMPRESA:
        if (!resultado.razonSocial)
          throw new NotFoundException(`Detalle de Empresa no encontrado`);
        return resultado.razonSocial;

      default:
        throw new BadRequestException(
          `Tipo de entidad no soportado: ${resultado.tipo}`,
        );
    }
  }

  async findAll() {
    const entidades = await this.entidadRepository
      .createQueryBuilder('entidad')
      .leftJoinAndMapOne(
        'entidad.persona',
        Persona,
        'persona',
        'persona.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.vehiculo',
        Vehiculo,
        'vehiculo',
        'vehiculo.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.empresa',
        Empresa,
        'empresa',
        'empresa.id = entidad.id',
      )
      .getMany();

    return entidades.map((entidad) => {
      switch (entidad.tipo) {
        case TipoEntidad.PERSONA:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.persona ?? null,
          };

        case TipoEntidad.VEHICULO:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.vehiculo ?? null,
          };

        case TipoEntidad.EMPRESA:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.empresa ?? null,
          };

        default:
          throw new BadRequestException(
            `Tipo de entidad no soportado: ${entidad.tipo}`,
          );
      }
    });
  }

  async findOne(id: number) {
    const resultado = await this.entidadRepository
      .createQueryBuilder('entidad')
      .leftJoinAndMapOne(
        'entidad.persona',
        Persona,
        'persona',
        'persona.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.vehiculo',
        Vehiculo,
        'vehiculo',
        'vehiculo.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.empresa',
        Empresa,
        'empresa',
        'empresa.id = entidad.id',
      )
      .where('entidad.id = :id', { id })
      .getOne();

    if (!resultado) {
      throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
    }

    switch (resultado.tipo) {
      case TipoEntidad.PERSONA:
        return {
          id: resultado.id,
          tipo: resultado.tipo,
          detalle: resultado.persona ?? null,
        };

      case TipoEntidad.VEHICULO:
        return {
          id: resultado.id,
          tipo: resultado.tipo,
          detalle: resultado.vehiculo ?? null,
        };

      case TipoEntidad.EMPRESA:
        return {
          id: resultado.id,
          tipo: resultado.tipo,
          detalle: resultado.empresa ?? null,
        };

      default:
        throw new BadRequestException(
          `Tipo de entidad no soportado: ${resultado.tipo}`,
        );
    }
  }

  async inicialData() {

    const query = await this.entidadRepository
      .createQueryBuilder('entidad')
      // ===== Detalle de la entidad =====
      .leftJoinAndMapOne(
        'entidad.persona',
        Persona,
        'persona',
        'persona.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.vehiculo',
        Vehiculo,
        'vehiculo',
        'vehiculo.id = entidad.id',
      )
      .leftJoinAndMapOne(
        'entidad.empresa',
        Empresa,
        'empresa',
        'empresa.id = entidad.id',
      )

      // ===== Todos los documentos =====
      .leftJoinAndMapMany(
        'entidad.documentos',
        Documento,
        'documento',
        'documento.entidad_id = entidad.id',
      )

      // ===== Última versión de cada documento =====
      .leftJoinAndMapOne(
        'documento.ultimaVersion',
        DocumentoVersion,
        'ultimaVersion',
        `
          ultimaVersion.documento_id = documento.id
          AND ultimaVersion.version = (
            SELECT MAX(dv.version)
            FROM documento_version dv
            WHERE dv.documento_id = documento.id
          )
        `,
      );

    const entidades = await query.getMany();

    return entidades.map((entidad) => {
      const documentation = this.documentStatusRule.buildDocumentation(
        entidad.documentos ?? [],
      );
      switch (entidad.tipo) {
        case TipoEntidad.PERSONA:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.persona,
            documentos: entidad.documentos,
            documentation,
            status: this.documentStatusRule.getEntityStatus(documentation),
          };

        case TipoEntidad.VEHICULO:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.vehiculo,
            documentos: entidad.documentos,
            documentation,
            status: this.documentStatusRule.getEntityStatus(documentation),
          };

        case TipoEntidad.EMPRESA:
          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: entidad.empresa,
            documentos: entidad.documentos,
            documentation,
            status: this.documentStatusRule.getEntityStatus(documentation),
          };

        default:
          throw new BadRequestException(
            `Tipo de entidad no soportado: ${entidad.tipo}`,
          );
      }
    });
  }
}
