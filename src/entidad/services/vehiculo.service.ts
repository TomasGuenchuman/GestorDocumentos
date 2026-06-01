// vehiculo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Vehiculo } from '../entities/vehiculo.entity';
import { createVehiculoDTO } from '../dto/createVehiculoDTO.dto';
import { UpdateVehiculoDto } from '../dto/UpdateVehiculoDto.dto';

@Injectable()
export class VehiculoService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async crearVehiculo(dto: createVehiculoDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Crear y guardar la entidad base
      const nuevaEntidad = new Entidad();
      nuevaEntidad.tipo = TipoEntidad.VEHICULO;
      const entidadGuardada = await queryRunner.manager.save(nuevaEntidad);

      // 2. Crear y guardar la persona usando el ID generado
      const nuevoVehiculo = new Vehiculo();
      nuevoVehiculo.id = entidadGuardada.id; // Asignamos la PK/FK
      nuevoVehiculo.patente = dto.patente;
      nuevoVehiculo.marca = dto.marca;
      nuevoVehiculo.modelo = dto.modelo;

      await queryRunner.manager.save(nuevoVehiculo);

      // 3. Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevoVehiculo;
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
    updateVehiculoDto: UpdateVehiculoDto,
  ): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.preload({
      id,
      ...updateVehiculoDto,
    });

    if (!vehiculo) {
      throw new NotFoundException(`No existe un vehículo con id ${id}`);
    }

    return this.vehiculoRepository.save(vehiculo);
  }
}
