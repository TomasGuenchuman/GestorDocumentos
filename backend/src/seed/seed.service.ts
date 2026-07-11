import { Injectable, Logger } from '@nestjs/common';
import { VehiculoSeeder } from './seeders/vehiculo.seeder';
import { PersonaSeeder } from './seeders/persona.seeder';
import { EmpresaSeeder } from './seeders/empresa.seeder';
import { CategoriaSeeder } from './seeders/categoria.seeder';
import { DocumentoSeeder } from './seeders/documentos.seeder';
import { DocumentoVersionSeeder } from './seeders/documentosVersion.seeder';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly vehiculoSeeder: VehiculoSeeder,
    private readonly personaSeeder: PersonaSeeder,
    private readonly empresaSeeder: EmpresaSeeder,
    private readonly categoriaSeeder: CategoriaSeeder,
    private readonly documentoSeeder: DocumentoSeeder,
    private readonly documentoVersionSeeder: DocumentoVersionSeeder,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Iniciando carga de datos...');

    await this.vehiculoSeeder.run();
    await this.personaSeeder.run();
    await this.empresaSeeder.run();
    await this.categoriaSeeder.run();
    await this.documentoSeeder.run();
    await this.documentoVersionSeeder.run();
    this.logger.log('Seed finalizado correctamente.');
  }
}
