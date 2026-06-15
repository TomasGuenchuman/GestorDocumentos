import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entidades
import { Entidad } from './entities/entidad.entity';
import { Persona } from './entities/persona.entity';
import { Empresa } from './entities/empresa.entity';
import { Vehiculo } from './entities/vehiculo.entity';

// Servicios
import { PersonaService } from './services/persona.service';
import { EmpresaService } from './services/empresa.service';
import { VehiculoService } from './services/vehiculo.service';
import { EntidadService } from './services/entidad.service';

// Controladores
import { PersonaController } from './controllers/persona.controller';
import { EmpresaController } from './controllers/empresa.controller';
import { VehiculoController } from './controllers/vehiculo.controller';
import { EntidadController } from './controllers/entidad.controller';

@Module({
  imports: [
    // Importante: Registrar todas las tablas aquí
    TypeOrmModule.forFeature([Entidad, Persona, Empresa, Vehiculo]),
  ],
  controllers: [
    PersonaController,
    EmpresaController,
    VehiculoController,
    EntidadController,
  ],
  providers: [PersonaService, EmpresaService, VehiculoService, EntidadService],
  exports: [PersonaService, EmpresaService, VehiculoService, EntidadService],
})
export class EntidadModule {}
