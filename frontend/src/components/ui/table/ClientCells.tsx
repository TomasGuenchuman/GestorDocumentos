"use client";
import { PdfCell, ActionsCell } from "./table.components";
import { DocumentTableRow } from "./Table";

export function PdfClientCell({ row }: { row: DocumentTableRow }) {
  const handlePdfClick = () => {
    // Aquí manejas la lógica del cliente.
    // Ej: Abrir un modal, descargar el PDF, redirigir a otra URL
    console.log("Descargando PDF para:", row.document.title);
  };

  return <PdfCell available={row.pdf.available} onClick={handlePdfClick} />;
}

export function ActionsClientCell({ row }: { row: DocumentTableRow }) {
  const handleActionClick = () => {
    // Lógica del menú de acciones
    console.log("Abriendo acciones para:", row.id);
  };

  return <ActionsCell onClick={handleActionClick} />;
}
