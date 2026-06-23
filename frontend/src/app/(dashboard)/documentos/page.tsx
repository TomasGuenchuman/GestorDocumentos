import { Suspense } from "react";

import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import ClientFilterTable from "@/features/documentos/components/ClientFilterTable";
import ClientFilterTableSkeleton from "@/features/documentos/components/ClientFilterTableSkeleton";

async function fetchDashboardData() {
  // await prisma.document.findMany(...)
  // Simulamos un retraso artificial de 1 segundos para ver el efecto
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
  return <ClientFilterTable />;
}

export default async function Documentos() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <header className="shrink-0 flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold text-slate-800">Documentos</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Cargar Nuevo Documento
        </Button>
      </header>
      <Suspense fallback={<ClientFilterTableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
