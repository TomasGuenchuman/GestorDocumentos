import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDTO } from './createCategoriaDTO.dto';

export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
