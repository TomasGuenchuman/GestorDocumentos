// vehiculo.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, Repository, Not } from 'typeorm';
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
    // 1. Validación de Negocio: La patente debe ser única
    const vehiculoExistente = await this.vehiculoRepository.findOne({
      where: { patente: dto.patente },
    });

    if (vehiculoExistente) {
      throw new BadRequestException(
        `Ya existe un vehículo registrado con la patente ${dto.patente}`,
      );
    }

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
    // 1. Verificar primero si el vehículo a actualizar realmente existe en la base de datos
    const vehiculoExistente = await this.vehiculoRepository.findOne({
      where: { id },
    });
    if (!vehiculoExistente) {
      throw new NotFoundException(`No existe un vehículo con id ${id}`);
    }

    // 2. Validación de Negocio: Si está intentando cambiar la patente, verificar que no la use OTR0 vehículo
    if (updateVehiculoDto.patente) {
      const patenteDuplicada = await this.vehiculoRepository.findOne({
        where: {
          patente: updateVehiculoDto.patente,
          id: Not(id), // Excluimos al vehículo actual de la búsqueda
        },
      });

      if (patenteDuplicada) {
        throw new BadRequestException(
          `La patente ${updateVehiculoDto.patente} ya está asignada a otro vehículo`,
        );
      }
    }

    // 3. Aplicar los cambios parciales con preload
    const vehiculoALogear = await this.vehiculoRepository.preload({
      id,
      ...updateVehiculoDto,
    });

    // 4. Salvaguarda para TypeScript (Type Narrowing) evitando errores de asignación por 'undefined'
    if (!vehiculoALogear) {
      throw new NotFoundException(
        `No se pudo precargar el vehículo con id ${id}`,
      );
    }

    return this.vehiculoRepository.save(vehiculoALogear);
  }
}
