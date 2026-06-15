import { PartialType } from '@nestjs/swagger'; // Nota: Si no usas Swagger, impórtalo de '@nestjs/mapped-types'
import { CreateDocumentoVersionCustomDTO } from './createDocumentoVersionCustom.dto';

export class UpdateDocumentoVersionCustomDTO extends PartialType(
  CreateDocumentoVersionCustomDTO,
) {}
