import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';

export class CreateCategoriaDTO {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  nombre!: string;

  @IsEnum(TipoEntidad, {
    message: 'El tipo debe ser un valor válido de TipoEntidad',
  })
  tipo!: TipoEntidad;
}
