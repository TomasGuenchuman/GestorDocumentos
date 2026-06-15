import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

@Entity()
export class Entidad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    enum: TipoEntidad,
  })
  tipo!: TipoEntidad;
}
