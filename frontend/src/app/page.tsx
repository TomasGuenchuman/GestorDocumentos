import DocumentStatusCard from "@/components/ui/DocumentsStatusCard";
export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-around">
        <DocumentStatusCard
          status="vencido"
          title="Vencidos"
          count={10}
          subtext="Requieren accion inmediata"
        />
        <DocumentStatusCard
          status="por-vencer"
          title="Proximos a vencer"
          count={10}
          subtext="Dentro de los proximos 30 dias"
        />
        <DocumentStatusCard
          status="vigente"
          title="Vigentes"
          count={10}
          subtext="Documentos al dia"
        />
      </div>

      <div>
        CONTENEDOR
        <div>CALENDARIO</div>
        <div>PRORIDADES</div>
      </div>
    </>
  );
}
