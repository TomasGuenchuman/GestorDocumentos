// persona.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Entidad } from '../entities/entidad.entity';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Empresa } from '../entities/empresa.entity';
import { createEmpresaDTO } from '../dto/createEmpresaDTO.dto';
import { UpdateEmpresaDto } from '../dto/UpdateEmpresaDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async crearEmpresa(dto: createEmpresaDTO) {
    // 1. Validación de Negocio: El CUIT debe ser único
    const empresaExistente = await this.empresaRepository.findOne({
      where: { cuit: dto.cuit },
    });

    if (empresaExistente) {
      throw new BadRequestException(
        `Ya existe una empresa registrada con el CUIT ${dto.cuit}`,
      );
    }

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
    // 1. Verificar primero si la empresa a actualizar realmente existe
    const empresaExistente = await this.empresaRepository.findOne({
      where: { id },
    });
    if (!empresaExistente) {
      throw new NotFoundException(`No existe una empresa con id ${id}`);
    }

    // 2. Validación de Negocio: Si está intentando cambiar el CUIT, verificar que no lo use OTRA empresa
    if (updateEmpresaDto.cuit) {
      const cuitDuplicado = await this.empresaRepository.findOne({
        where: {
          cuit: updateEmpresaDto.cuit,
          id: Not(id), // Excluimos a la empresa actual de la búsqueda
        },
      });

      if (cuitDuplicado) {
        throw new BadRequestException(
          `El CUIT ${updateEmpresaDto.cuit} ya está asignado a otra empresa`,
        );
      }
    }

    // 3. Aplicar los cambios parciales con preload
    const empresaALogear = await this.empresaRepository.preload({
      id,
      ...updateEmpresaDto,
    });

    // 4. ¡LA SOLUCIÓN! Añadimos una salvaguarda para TypeScript
    if (!empresaALogear) {
      throw new NotFoundException(
        `No se pudo precargar la empresa con id ${id}`,
      );
    }

    return this.empresaRepository.save(empresaALogear);
  }
}
