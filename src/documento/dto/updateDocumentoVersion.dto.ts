import { PartialType } from '@nestjs/swagger'; // Nota: Si no usas Swagger, impórtalo de '@nestjs/mapped-types'
import { CreateDocumentoVersionDTO } from './createDocumentoVersion.dto';

export class UpdateDocumentoVersionDTO extends PartialType(
  CreateDocumentoVersionDTO,
) {}
