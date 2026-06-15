import { PrimaryColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { Entidad } from './entidad.entity';

@Entity()
export class Empresa {
  @PrimaryColumn()
  id!: number;

  @OneToOne(() => Entidad, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  entidad!: Entidad;

  @Column()
  razonSocial!: string;

  @Column()
  cuit!: string;
}
