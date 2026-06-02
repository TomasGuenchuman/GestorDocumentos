import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDTO } from '../dto/createCategoriaDTO.dto';
import { UpdateCategoriaDTO } from '../dto/updateCategoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDTO): Promise<Categoria> {
    const existe = await this.categoriaRepository.findOne({
      where: {
        nombre: dto.nombre,
      },
    });

    if (existe) {
      throw new BadRequestException('Ya existe una categoría con ese nombre');
    }

    const categoria = this.categoriaRepository.create(dto);

    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDTO): Promise<Categoria> {
    const categoria = await this.findOne(id);

    if (dto.nombre !== undefined) {
      const nombre = dto.nombre;

      const existe = await this.categoriaRepository.findOne({
        where: {
          nombre,
        },
      });

      if (existe && existe.id !== id) {
        throw new BadRequestException('Ya existe una categoría con ese nombre');
      }

      categoria.nombre = nombre;
    }

    if (dto.tipo !== undefined) {
      categoria.tipo = dto.tipo;
    }

    return await this.categoriaRepository.save(categoria);
  }
}
