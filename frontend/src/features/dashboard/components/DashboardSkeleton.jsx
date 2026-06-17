import DashboardCardsLayout from "@/features/dashboard/components/DashboardCardsLayout";

export default function DashboardSkeleton() {
  const Placeholder = (
    <div className="h-8 w-12 bg-slate-200 animate-pulse rounded"></div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Usamos el layout con los placeholders */}
      <div className="shrink-0 flex flex-row justify-around gap-4">
        <DashboardCardsLayout
          vencidosCount={Placeholder}
          porVencerCount={Placeholder}
          vigentesCount={Placeholder}
        />
      </div>

      {/* Skeleton del calendario */}
      <div className="flex-1 min-h-[400px] w-full bg-slate-200 rounded-lg animate-pulse mt-4"></div>
    </div>
  );
}
