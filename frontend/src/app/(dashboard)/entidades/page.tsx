import { Suspense } from "react";

import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import ClientFilterTable from "@/features/entidades/components/ClientFilterTable";
import ClientFilterTableSkeleton from "@/features/entidades/components/ClientFilterTableSkeleton";
import Link from "next/link";
import { EntidadService } from "@/features/entidades/api/entidad.service";

async function fetchDashboardData() {
  // await prisma.document.findMany(...)
  // Simulamos un retraso artificial de 1 segundos para ver el efecto
  await new Promise((resolve) => setTimeout(resolve, 500));

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

async function DocumentData() {
  const data = await EntidadService.inicialData();
  return <ClientFilterTable data={data} />;
}

export default async function Entidades() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <header className="shrink-0 flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold text-slate-800">Entidades</h1>
        <Link href="/entidades/nuevo">
          <Button variant="primary" icon={<Plus size={18} />}>
            Cargar Nueva Entidad
          </Button>
        </Link>
      </header>
      <Suspense fallback={<ClientFilterTableSkeleton />}>
        <DocumentData />
      </Suspense>
    </div>
  );
}
