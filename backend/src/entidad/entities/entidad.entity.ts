import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { Documento } from 'src/documento/entities/documento.entity';
import { Empresa } from './empresa.entity';
import { Vehiculo } from './vehiculo.entity';
import { Persona } from './persona.entity';

@Entity()
export class Entidad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    enum: TipoEntidad,
  })
  tipo!: TipoEntidad;

  // Solo para TypeScript
  persona?: Persona;

  vehiculo?: Vehiculo;

  empresa?: Empresa;

  documentos?: Documento[];
}
