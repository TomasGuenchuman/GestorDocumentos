export default function VehiculoForm() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Datos del vehículo</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Dominio</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Marca</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Modelo</label>

          <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </div>
      </div>
    </div>
  );
}
