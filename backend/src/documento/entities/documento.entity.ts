import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { Entidad } from 'src/entidad/entities/entidad.entity';

@Entity()
@Unique(['categoria', 'entidad'])
export class Documento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  nombre!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  requiere_vencimiento!: boolean;

  // 🔹 FK a Categoria
  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  // 🔹 FK a Entidad
  @ManyToOne(() => Entidad, { nullable: false })
  @JoinColumn({ name: 'entidad_id' })
  entidad!: Entidad;
}
