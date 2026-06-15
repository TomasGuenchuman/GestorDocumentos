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
    const entidad = await this.entidadRepository.findOne({
      where: { id: entidadId },
    });

    if (!entidad) {
      throw new NotFoundException(`Entidad con ID ${entidadId} no encontrada`);
    }

    switch (entidad.tipo) {
      case TipoEntidad.PERSONA: {
        const persona = await this.personaRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!persona) {
          throw new NotFoundException(
            `Persona asociada a la entidad ${entidadId} no encontrada`,
          );
        }

        return persona.apellido + '' + persona.nombre;
      }

      case TipoEntidad.VEHICULO: {
        const vehiculo = await this.vehiculoRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!vehiculo) {
          throw new NotFoundException(
            `Vehículo asociado a la entidad ${entidadId} no encontrado`,
          );
        }

        return vehiculo.patente;
      }

      case TipoEntidad.EMPRESA: {
        const empresa = await this.empresaRepository.findOne({
          where: {
            entidad: { id: entidadId },
          },
          relations: ['entidad'],
        });

        if (!empresa) {
          throw new NotFoundException(
            `Empresa asociada a la entidad ${entidadId} no encontrada`,
          );
        }

        return empresa.razonSocial;
      }

      default:
        throw new BadRequestException('Tipo de entidad no soportado:');
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
