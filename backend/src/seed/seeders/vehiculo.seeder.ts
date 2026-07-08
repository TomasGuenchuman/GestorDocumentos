import { Injectable, Logger } from '@nestjs/common';
import { VehiculoService } from 'src/entidad/services/vehiculo.service';
import vehiculos from '../data/vehiculos.json';

@Injectable()
export class VehiculoSeeder {
  private readonly logger = new Logger(VehiculoSeeder.name);

  constructor(private readonly vehiculoService: VehiculoService) {}

  async run(): Promise<void> {
    this.logger.log(`Cargando ${vehiculos.length} vehículos...`);

    for (const vehiculo of vehiculos) {
      try {
        await this.vehiculoService.crearVehiculo({
          patente: vehiculo.patente,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
        });

        this.logger.log(`Vehículo ${vehiculo.patente} creado.`);
      } catch (error) {
        this.logger.warn(
          `No se pudo crear el vehículo ${vehiculo.patente}: ${error.message}`,
        );
      }
    }

    this.logger.log('Vehículos cargados.');
  }
}
