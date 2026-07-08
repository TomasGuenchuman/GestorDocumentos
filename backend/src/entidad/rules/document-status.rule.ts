import { Injectable } from '@nestjs/common';
import { Documento } from 'src/documento/entities/documento.entity';
export type DocumentStatus = 'current' | 'warning' | 'expired';

export interface DocumentationSummary {
  current: number;
  warning: number;
  expired: number;
  total: number;
}

@Injectable()
export class DocumentStatusRule {
  /**
   * Cantidad de días antes del vencimiento para considerar
   * un documento como "próximo a vencer".
   */
  private readonly warningDays = 30;

  /**
   * Obtiene el estado de un documento.
   */
  getDocumentStatus(documento: Documento): DocumentStatus {
    // No tiene ninguna versión cargada
    if (!documento.ultimaVersion) {
      return 'expired';
    }

    // No requiere vencimiento
    if (!documento.requiere_vencimiento) {
      return 'current';
    }

    // No tiene fecha de vencimiento
    if (!documento.ultimaVersion.fecha_vencimiento) {
      return 'expired';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expirationDate = new Date(documento.ultimaVersion.fecha_vencimiento);
    expirationDate.setHours(0, 0, 0, 0);

    // Ya venció
    if (expirationDate < today) {
      return 'expired';
    }

    // Próximo a vencer
    const warningDate = new Date(today);
    warningDate.setDate(warningDate.getDate() + this.warningDays);

    if (expirationDate <= warningDate) {
      return 'warning';
    }

    // Vigente
    return 'current';
  }

  /**
   * Genera el resumen de documentación de una entidad.
   */
  buildDocumentation(documentos: Documento[]): DocumentationSummary {
    const summary: DocumentationSummary = {
      current: 0,
      warning: 0,
      expired: 0,
      total: documentos.length,
    };

    for (const documento of documentos) {
      const status = this.getDocumentStatus(documento);

      summary[status]++;
    }

    return summary;
  }

  /**
   * Obtiene el estado general de la entidad.
   */
  getEntityStatus(
    documentation: DocumentationSummary,
  ): 'al-dia' | 'warning' | 'expired' {
    if (documentation.expired > 0) {
      return 'expired';
    }

    if (documentation.warning > 0) {
      return 'warning';
    }

    return 'al-dia';
  }
}
