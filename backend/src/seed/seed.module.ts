import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';

import { EntidadModule } from 'src/entidad/entidad.module';
import { DocumentoModule } from 'src/documento/documento.module';
import { PersonaSeeder } from './seeders/persona.seeder';
import { EmpresaSeeder } from './seeders/empresa.seeder';
import { CategoriaSeeder } from './seeders/categoria.seeder';
import { DocumentoSeeder } from './seeders/documentos.seeder';
import { DocumentoVersionSeeder } from './seeders/documentosVersion.seeder';

@Module({
  imports: [EntidadModule, DocumentoModule],
  providers: [
    SeedService,
    VehiculoSeeder,
    PersonaSeeder,
    EmpresaSeeder,
    CategoriaSeeder,
    DocumentoSeeder,
    DocumentoVersionSeeder,
  ],
  exports: [SeedService],
})
export class SeedModule {}
