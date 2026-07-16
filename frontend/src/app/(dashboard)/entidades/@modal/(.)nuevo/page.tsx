import { FileText } from "lucide-react";
import RouteModal from "@/components/ui/RouteModal";
import NuevoEntidadForm from "@/features/entidades/components/NuevoEntidadForm";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

async function fetchDashboardData() {
  // await prisma.document.findMany(...)
  // Simulamos un retraso artificial de 1 segundos para ver el efecto
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    vencidos: 12,
    porVencer: 5,
    vigentes: 48,
    events: [
      { date: "2026-06-17", title: "Seguro vence" },
      { date: "2026-07-03", title: "Póliza flota principal" },
    ],
  };
}

async function DataTable() {
  const data = await fetchDashboardData();
  return <NuevoEntidadForm />;
}

export default function NuevoEntidad() {
  return (
    <RouteModal
      title="Datos de la Entidad"
      icon={<FileText size={22} className="text-slate-700" />}
      panelClassName="max-w-4xl p-0 overflow-hidden min-w-[70vw] max-h-[90vh]"
    >
      <Suspense fallback={<Spinner />}>
        <DataTable />
      </Suspense>
    </RouteModal>
  );
}
