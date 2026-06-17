import DocumentsCalendar from "@/features/dashboard/components/DocumentsCalendar";
import DashboardCardsLayout from "@/features/dashboard/components/DashboardCardsLayout";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import DashboardSkeleton from "../features/dashboard/components/DashboardSkeleton";

async function fetchDashboardData() {
  // await prisma.document.findMany(...)
  // Simulamos un retraso artificial de 2 segundos para ver el efecto
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

async function DataDashboard() {
  const data = await fetchDashboardData();
  const calendarEvents = [
    {
      date: "2026-06-17",
      title: "Seguro vence",
    },
    {
      date: "2026-06-20",
      title: "VTV",
    },
    {
      date: "2026-06-20",
      title: "Licencia",
    },
    {
      date: "2026-07-03",
      title: "Póliza empresa",
    },
  ];
  return (
    <>
      <div className="shrink-0 flex flex-row justify-around gap-4">
        <DashboardCardsLayout
          vencidosCount={12}
          porVencerCount={11}
          vigentesCount={10}
        />
      </div>

      <section className="flex-1 min-h-0">
        <DocumentsCalendar events={calendarEvents} />
      </section>
    </>
  );
}

export default async function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <header className="shrink-0 flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Documentos
        </h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Cargar Nuevo Documento
        </Button>
      </header>
      <Suspense fallback={<DashboardSkeleton />}>
        <DataDashboard />
      </Suspense>
    </div>
  );
}
