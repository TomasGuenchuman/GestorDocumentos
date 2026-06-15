import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Documento } from './documento.entity';

@Entity()
@Unique(['version', 'documento'])
export class DocumentoVersion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha_vencimiento?: Date | null;

  @Column({
    type: 'int',
  })
  version!: number;

  @Column({
    type: 'varchar',
  })
  url!: string;

  @ManyToOne(() => Documento, (documento) => documento.versiones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documento_id' })
  documento!: Documento;
}
