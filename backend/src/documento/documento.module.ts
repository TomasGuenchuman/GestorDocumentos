import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Documento } from './entities/documento.entity';
import { DocumentoVersion } from './entities/documentoVersion.entity';
import { DocumentoService } from './services/documento.service';
import { DocumentoController } from './controllers/documento.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';
import { Entidad } from 'src/entidad/entities/entidad.entity';
import { EntidadModule } from 'src/entidad/entidad.module';
import { DocumentoVersionService } from './services/documentoVersion.service';
import { DocumentoVersionController } from './controllers/documentoVersion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Documento, DocumentoVersion, Entidad]),
    EntidadModule,
  ],
  controllers: [
    DocumentoController,
    CategoriaController,
    DocumentoVersionController,
  ],
  providers: [DocumentoService, CategoriaService, DocumentoVersionService],
})
export class DocumentoModule {}
