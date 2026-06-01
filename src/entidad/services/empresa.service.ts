// persona.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Empresa } from '../entities/empresa.entity';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';
import { UpdateEmpresaDto } from '../dto/UpdateEmpresaDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class EmpresaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async crearEmpresa(dto: createEmpresaDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Crear y guardar la entidad base
      const nuevaEntidad = new Entidad();
      nuevaEntidad.tipo = TipoEntidad.EMPRESA;
      const entidadGuardada = await queryRunner.manager.save(nuevaEntidad);

      // 2. Crear y guardar la persona usando el ID generado
      const nuevaEmpresa = new Empresa();
      nuevaEmpresa.id = entidadGuardada.id; // Asignamos la PK/FK
      nuevaEmpresa.cuit = dto.cuit;
      nuevaEmpresa.razonSocial = dto.razonSocial;

      await queryRunner.manager.save(nuevaEmpresa);

      // 3. Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevaEmpresa;
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
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const empresa = await this.empresaRepository.preload({
      id,
      ...updateEmpresaDto,
    });

    if (!empresa) {
      throw new NotFoundException(`No existe una empresa con id ${id}`);
    }

    return this.empresaRepository.save(empresa);
  }
}
