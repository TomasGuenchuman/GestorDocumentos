export default function EmpresaForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Datos de la empresa</h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium">Razón social</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">CUIT</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Rubro</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </div>
      </div>
    </div>
  );
}
