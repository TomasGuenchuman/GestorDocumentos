import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoriaService } from '../services/categoria.service';
import { CreateCategoriaDTO } from '../dto/createCategoriaDTO.dto';
import { Categoria } from '../entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // POST /categorias
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateCategoriaDTO): Promise<Categoria> {
    return await this.categoriaService.create(dto);
  }

  // GET /categorias
  @Get()
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  // GET /categorias/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return await this.categoriaService.findOne(id);
  }
}
