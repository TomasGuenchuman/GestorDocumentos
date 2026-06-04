import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { Entidad } from 'src/entidad/entities/entidad.entity';
import { DocumentoVersion } from './documentoVersion.entity';

export type DocumentoConUltimaVersion = {
  id: number;
  nombre: string;
  requiere_vencimiento: boolean;

  categoria: {
    id: number;
    nombre: string;
    tipo: string;
  };

  entidad: {
    id: number;
    tipo: string;
    detalle?: unknown;
  };

  ultimaVersion: {
    id: number;
    fecha_vencimiento: Date | null;
    version: number;
    url: string;
  } | null;
};

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

  @OneToMany(
    () => DocumentoVersion,
    (documentoVersion) => documentoVersion.documento,
  )
  versiones!: DocumentoVersion[];
}
