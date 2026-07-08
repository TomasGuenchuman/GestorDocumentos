import { Injectable, Logger } from '@nestjs/common';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly vehiculoSeeder: VehiculoSeeder) {}

  async run(): Promise<void> {
    this.logger.log('Iniciando carga de datos...');

    await this.vehiculoSeeder.run();

    this.logger.log('Seed finalizado correctamente.');
  }
}
