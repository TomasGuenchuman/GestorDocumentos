import { Injectable, Logger } from '@nestjs/common';
import { PersonaService } from 'src/entidad/services/persona.service';
import personas from '../data/personas.json';

@Injectable()
export class PersonaSeeder {

  constructor(private readonly personaService: PersonaService) {}
  private readonly logger = new Logger(PersonaSeeder.name);

  async run(): Promise<void> {
    this.logger.log(`Cargando ${personas.length} personas...`);

    for (const persona of personas) {
      try {
        await this.personaService.crearPersona({
          dni: persona.dni,
          nombre: persona.nombre,
          apellido: persona.apellido,
        });

        this.logger.log(`Persona ${persona.dni} creada.`);
      } catch (error) {
        this.logger.warn(
          `No se pudo crear la persona ${persona.dni}: ${error.message}`,
        );
      }
    }

    this.logger.log('Personas cargadas.');
  }
}
