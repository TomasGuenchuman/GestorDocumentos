import { IsBoolean, IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentoDTO {
  @ApiProperty({
    description: 'Indica si el documento tiene una fecha de caducidad',
    example: true,
  })
  @IsNotEmpty({
    message: 'Debe especificar si el documento requiere vencimiento',
  })
  @IsBoolean({
    message:
      'El campo requiere_vencimiento debe ser verdadero (true) o falso (false)',
  })
  requiere_vencimiento!: boolean;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el documento',
    example: 2,
  })
  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio' })
  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @IsPositive({
    message: 'El ID de la categoría no puede ser negativo ni cero',
  })
  categoriaId!: number;

  @ApiProperty({
    description:
      'ID de la entidad (empresa, vehículo o persona) dueña del documento',
    example: 15,
  })
  @IsNotEmpty({ message: 'El ID de la entidad es obligatorio' })
  @IsInt({ message: 'El ID de la entidad debe ser un número entero' })
  @IsPositive({ message: 'El ID de la entidad no puede ser negativo ni cero' })
  entidadId!: number;
}
