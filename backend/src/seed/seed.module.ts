import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';

import { EntidadModule } from 'src/entidad/entidad.module';

@Module({
  imports: [EntidadModule],
  providers: [SeedService, VehiculoSeeder],
  exports: [SeedService],
})
export class SeedModule {}
