import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

@Entity()
@Unique(['nombre', 'tipo'])
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({
    type: 'text',
    enum: TipoEntidad,
  })
  tipo!: TipoEntidad;
}
