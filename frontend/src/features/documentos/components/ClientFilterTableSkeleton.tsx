type ClientFilterTableSkeletonProps = {
  rows?: number;
  filters?: number;
  className?: string;
};

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 ${className}`}
      aria-hidden="true"
    />
  );
}

function FiltersBarSkeleton({ filters = 3 }: { filters?: number }) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex flex-wrap items-center gap-4 border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <SkeletonBlock className="h-[18px] w-[18px] rounded-full" />
          <SkeletonBlock className="h-4 w-16" />
        </div>

        {Array.from({ length: filters }).map((_, index) => (
          <SkeletonBlock
            key={index}
            className="h-10 w-[140px] max-w-full border border-gray-300 bg-white"
          />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="w-[24%] px-5 py-4 text-left">
                <SkeletonBlock className="h-3 w-full max-w-24" />
              </th>

              <th className="w-[24%] px-5 py-4 text-left">
                <SkeletonBlock className="h-3 w-full max-w-20" />
              </th>

              <th className="w-[14%] px-5 py-4 text-center">
                <SkeletonBlock className="mx-auto h-3 w-full max-w-16" />
              </th>

              <th className="w-[16%] px-5 py-4 text-left">
                <SkeletonBlock className="h-3 w-full max-w-24" />
              </th>

              <th className="w-[10%] px-5 py-4 text-center">
                <SkeletonBlock className="mx-auto h-3 w-full max-w-10" />
              </th>

              <th className="w-[12%] px-5 py-4 text-center">
                <SkeletonBlock className="mx-auto h-3 w-full max-w-20" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="border-t border-slate-200">
                <td className="px-5 py-4 align-middle">
                  <div className="min-w-0 space-y-2">
                    <SkeletonBlock className="h-4 w-full max-w-40" />
                    <SkeletonBlock className="h-3 w-full max-w-20" />
                  </div>
                </td>

                <td className="px-5 py-4 align-middle">
                  <div className="flex min-w-0 items-center gap-3">
                    <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <SkeletonBlock className="h-4 w-full max-w-32" />
                      <SkeletonBlock className="h-3 w-full max-w-20" />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-center align-middle">
                  <SkeletonBlock className="mx-auto h-6 w-full max-w-24 rounded-full" />
                </td>

                <td className="px-5 py-4 align-middle">
                  <div className="min-w-0 space-y-2">
                    <SkeletonBlock className="h-4 w-full max-w-28" />
                    <SkeletonBlock className="h-3 w-full max-w-20" />
                  </div>
                </td>

                <td className="px-5 py-4 text-center align-middle">
                  <SkeletonBlock className="mx-auto h-8 w-8 rounded-md" />
                </td>

                <td className="px-5 py-4 text-center align-middle">
                  <SkeletonBlock className="mx-auto h-8 w-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ClientFilterTableSkeleton({
  rows = 5,
  filters = 3,
}: ClientFilterTableSkeletonProps) {
  return (
    <>
      <FiltersBarSkeleton filters={filters} />

      <div className="mt-4">
        <TableSkeleton rows={rows} />
      </div>

      <span className="sr-only">Cargando documentos...</span>
    </>
  );
}
