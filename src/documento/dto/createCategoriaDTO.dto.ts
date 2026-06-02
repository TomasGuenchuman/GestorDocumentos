import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { TipoEntidad } from 'src/common/tipoEntidad.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDTO {
  @ApiProperty({
    description: 'Titulo de la categoría (Solo letras, números y espacios)',
    example: 'habilitacion municipal',
  })
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
