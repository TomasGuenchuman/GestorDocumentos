// persona.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
    const persona = await this.personaRepository.preload({
      id,
      ...updatePersonaDto,
    });

    if (!persona) {
      throw new NotFoundException(`No existe una persona con id ${id}`);
    }

    return this.personaRepository.save(persona);
  }
}
