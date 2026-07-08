import { Injectable, Logger } from '@nestjs/common';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';
import { PersonaSeeder } from './seeders/persona.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly vehiculoSeeder: VehiculoSeeder,
    private readonly personaSeeder: PersonaSeeder,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Iniciando carga de datos...');

    await this.vehiculoSeeder.run();
    await this.personaSeeder.run();

    this.logger.log('Seed finalizado correctamente.');
  }
}
