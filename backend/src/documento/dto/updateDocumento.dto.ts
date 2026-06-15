import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoDTO } from './createDocumentoDTO.dto'; // Asegúrate de que la ruta coincida con el nombre de tu archivo

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDTO) {}
