import DocumentStatusCard from "./DocumentsStatusCard";
import { ReactNode } from "react";

interface CardsLayoutProps {
  vencidosCount: number | ReactNode;
  porVencerCount: number | ReactNode;
  vigentesCount: number | ReactNode;
}

export default function DashboardCardsLayout({
  vencidosCount,
  porVencerCount,
  vigentesCount,
}: CardsLayoutProps) {
  // La estructura repetida ahora vive ÚNICAMENTE aquí
  return (
    <>
      <DocumentStatusCard
        status="vencido"
        title="Vencidos"
        count={vencidosCount}
        subtext="Requieren accion inmediata"
      />

      <DocumentStatusCard
        status="por-vencer"
        title="Proximos a vencer"
        count={porVencerCount}
        subtext="Dentro de los proximos 30 dias"
      />

      <DocumentStatusCard
        status="vigente"
        title="Vigentes"
        count={vigentesCount}
        subtext="Documentos al dia"
      />
    </>
  );
}
