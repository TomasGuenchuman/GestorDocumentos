import { Injectable, Logger } from '@nestjs/common';
import { EmpresaService } from 'src/entidad/services/empresa.service';
import empresas from '../data/empresas.json';

@Injectable()
export class EmpresaSeeder {
  constructor(private readonly empresaService: EmpresaService) {}
  private readonly logger = new Logger(EmpresaSeeder.name);

  async run(): Promise<void> {
    this.logger.log(`Cargando ${empresas.length} empresas...`);

    for (const empresa of empresas) {
      try {
        await this.empresaService.crearEmpresa({
          razonSocial: empresa.razonSocial,
          cuit: empresa.cuit,
        });

        this.logger.log(`Empresa ${empresa.cuit} creada.`);
      } catch (error) {
        this.logger.warn(
          `No se pudo crear la empresa ${empresa.cuit}: ${error.message}`,
        );
      }
    }

    this.logger.log('Empresas cargadas.');
  }
}
