import { Injectable, Logger } from '@nestjs/common';
import { CategoriaService } from 'src/documento/services/categoria.service';
import categorias from '../data/categorias.json';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

@Injectable()
export class CategoriaSeeder {
  constructor(private readonly categoriaService: CategoriaService) {}
  private readonly logger = new Logger(CategoriaSeeder.name);

  async run(): Promise<void> {
    this.logger.log(`Cargando ${categorias.length} categorias...`);

    for (const categoria of categorias) {
      try {
        await this.categoriaService.create({
          nombre: categoria.nombre,
          tipo: categoria.tipo as TipoEntidad,
        });

        this.logger.log(`Categoria ${categoria.nombre} creada.`);
      } catch (error) {
        this.logger.warn(
          `No se pudo crear la categoria ${categoria.nombre}: ${error.message}`,
        );
      }
    }

    this.logger.log('Categorias cargadas.');
  }
}
