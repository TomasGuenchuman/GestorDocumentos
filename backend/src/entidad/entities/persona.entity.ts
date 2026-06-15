import { PrimaryColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { Entidad } from './entidad.entity';

@Entity()
export class Persona {
  @PrimaryColumn()
  id!: number;

  @OneToOne(() => Entidad, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  entidad!: Entidad;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  dni!: string;
}
