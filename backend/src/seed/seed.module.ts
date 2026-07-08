import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';

import { EntidadModule } from 'src/entidad/entidad.module';
import { PersonaSeeder } from './seeders/persona.seeder';

@Module({
  imports: [EntidadModule],
  providers: [SeedService, VehiculoSeeder, PersonaSeeder],
  exports: [SeedService],
})
export class SeedModule {}
