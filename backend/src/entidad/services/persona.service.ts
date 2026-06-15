// persona.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Persona } from '../entities/persona.entity';
import { createPersonaDTO } from '../dto/createPersonaDTO.dto';
import { UpdatePersonaDto } from '../dto/pdate-persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async crearPersona(dto: createPersonaDTO) {
    // 1. Validación de Negocio: El DNI debe ser único
    const personaExistente = await this.personaRepository.findOne({
      where: { dni: dto.dni },
    });

    if (personaExistente) {
      throw new BadRequestException(
        `Ya existe una persona registrada con el DNI ${dto.dni}`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Crear y guardar la entidad base
      const nuevaEntidad = new Entidad();
      nuevaEntidad.tipo = TipoEntidad.PERSONA;
      const entidadGuardada = await queryRunner.manager.save(nuevaEntidad);

      // 2. Crear y guardar la persona usando el ID generado
      const nuevaPersona = new Persona();
      nuevaPersona.id = entidadGuardada.id; // Asignamos la PK/FK
      nuevaPersona.dni = dto.dni;
      nuevaPersona.nombre = dto.nombre;
      nuevaPersona.apellido = dto.apellido;

      await queryRunner.manager.save(nuevaPersona);

      // 3. Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevaPersona;
    } catch (err) {
      // Si algo falla, revertimos los cambios en ambas tablas
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    // 1. Verificar primero si la persona a actualizar realmente existe en DB
    const personaExistente = await this.personaRepository.findOne({
      where: { id },
    });
    if (!personaExistente) {
      throw new NotFoundException(`No existe una persona con id ${id}`);
    }

    // 2. Validación de Negocio: Si está intentando cambiar el DNI, verificar que no lo use OTRA persona
    if (updatePersonaDto.dni) {
      const dniDuplicado = await this.personaRepository.findOne({
        where: {
          dni: updatePersonaDto.dni,
          id: Not(id), // Excluimos a la persona actual de la búsqueda
        },
      });

      if (dniDuplicado) {
        throw new BadRequestException(
          `El DNI ${updatePersonaDto.dni} ya está asignado a otra persona`,
        );
      }
    }

    // 3. Aplicar los cambios parciales con preload
    const personaALogear = await this.personaRepository.preload({
      id,
      ...updatePersonaDto,
    });

    // 4. Salvaguarda para TypeScript (Type Narrowing) evitando errores de asignación por 'undefined'
    if (!personaALogear) {
      throw new NotFoundException(
        `No se pudo precargar la persona con id ${id}`,
      );
    }

    return this.personaRepository.save(personaALogear);
  }
}
