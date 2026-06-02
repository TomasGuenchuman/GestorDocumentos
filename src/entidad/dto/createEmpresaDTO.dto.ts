import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 1. Importa el decorador

export class createEmpresaDTO {
  @ApiProperty({
    description: 'Nombre o Razón Social de la empresa (Solo letras y espacios)',
    example: 'Empresa de Logistica SRL', // <--- AQUÍ DEFINES EL PLACEHOLDER
  })
  @IsString({ message: 'La razón social debe ser un texto' })
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'La razón social solo debe contener letras y espacios',
  })
  razonSocial: string;


  @ApiProperty({
    description: 'Número de CUIT de la empresa (11 dígitos sin guiones)',
    example: '20304567891', // <--- AQUÍ DEFINES EL PLACEHOLDER
  })
  @IsString({ message: 'El CUIT debe ser un texto de números' })
  @IsNotEmpty({ message: 'El CUIT es obligatorio' })
  @Length(11, 11, { message: 'El CUIT debe tener exactamente 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'El CUIT solo debe contener números' })
  cuit: string;
}
