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
    const entidades = await this.entidadRepository.find();

    const personaIds = entidades
      .filter((entidad) => entidad.tipo === TipoEntidad.PERSONA)
      .map((entidad) => entidad.id);

    const vehiculoIds = entidades
      .filter((entidad) => entidad.tipo === TipoEntidad.VEHICULO)
      .map((entidad) => entidad.id);

    const empresaIds = entidades
      .filter((entidad) => entidad.tipo === TipoEntidad.EMPRESA)
      .map((entidad) => entidad.id);

    const [personas, vehiculos, empresas] = await Promise.all([
      personaIds.length > 0
        ? this.personaRepository.find({
            where: {
              id: In(personaIds),
            },
          })
        : Promise.resolve([] as Persona[]),

      vehiculoIds.length > 0
        ? this.vehiculoRepository.find({
            where: {
              id: In(vehiculoIds),
            },
          })
        : Promise.resolve([] as Vehiculo[]),

      empresaIds.length > 0
        ? this.empresaRepository.find({
            where: {
              id: In(empresaIds),
            },
          })
        : Promise.resolve([] as Empresa[]),
    ]);

    const personasMap = new Map<number, Persona>(
      personas.map((persona): [number, Persona] => [persona.id, persona]),
    );

    const vehiculosMap = new Map<number, Vehiculo>(
      vehiculos.map((vehiculo): [number, Vehiculo] => [vehiculo.id, vehiculo]),
    );

    const empresasMap = new Map<number, Empresa>(
      empresas.map((empresa): [number, Empresa] => [empresa.id, empresa]),
    );

    return entidades.map((entidad) => {
      switch (entidad.tipo) {
        case TipoEntidad.PERSONA: {
          const persona = personasMap.get(entidad.id);

          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: persona ?? null,
          };
        }

        case TipoEntidad.VEHICULO: {
          const vehiculo = vehiculosMap.get(entidad.id);

          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: vehiculo ?? null,
          };
        }

        case TipoEntidad.EMPRESA: {
          const empresa = empresasMap.get(entidad.id);

          return {
            id: entidad.id,
            tipo: entidad.tipo,
            detalle: empresa ?? null,
          };
        }

        default:
          throw new BadRequestException(
            `Tipo de entidad no soportado: ${entidad.tipo}`,
          );
      }
    });
  }

  async findOne(id: number) {
    const entidad = await this.entidadRepository.findOne({
      where: { id },
    });

    if (!entidad) {
      throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
    }

    switch (entidad.tipo) {
      case TipoEntidad.PERSONA: {
        const persona = await this.personaRepository.findOne({
          where: { id: entidad.id },
        });

        return {
          id: entidad.id,
          tipo: entidad.tipo,
          detalle: persona ?? null,
        };
      }

      case TipoEntidad.VEHICULO: {
        const vehiculo = await this.vehiculoRepository.findOne({
          where: { id: entidad.id },
        });

        return {
          id: entidad.id,
          tipo: entidad.tipo,
          detalle: vehiculo ?? null,
        };
      }

      case TipoEntidad.EMPRESA: {
        const empresa = await this.empresaRepository.findOne({
          where: { id: entidad.id },
        });

        return {
          id: entidad.id,
          tipo: entidad.tipo,
          detalle: empresa ?? null,
        };
      }

      default:
        throw new BadRequestException(
          `Tipo de entidad no soportado: ${entidad.tipo}`,
        );
    }
  }
}
