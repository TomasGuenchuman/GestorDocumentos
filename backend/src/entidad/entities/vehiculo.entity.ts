import { PrimaryColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { Entidad } from './entidad.entity';

@Entity()
export class Vehiculo {
  @PrimaryColumn()
  id!: number;

  @OneToOne(() => Entidad, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  entidad!: Entidad;

  @Column({ unique: true })
  patente!: string;

  @Column({ nullable: true })
  marca?: string;

  @Column({ nullable: true })
  modelo?: string;
}
