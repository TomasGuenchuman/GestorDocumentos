"use client";

import { useState } from "react";
import {
  FileText,
  Trash2,
  Upload,
  Building2,
  FolderOpen,
  CalendarDays,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NuevoDocumentoForm() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Archivo seleccionado:", selectedFile);

    // Acá luego armás el FormData y llamás a tu backend.
  };

  return (
    <>
      <div className="mb-4 border-y border-slate-200 py-3">
        {selectedFile ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-red-600">
                <FileText size={20} />
              </div>

              <p className="truncate text-sm font-medium text-slate-900">
                {selectedFile.name}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemoveFile}
              className="rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Seleccionar un PDF</p>
        )}
      </div>

      <div className="mb-4">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          <Upload size={17} />
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
            Entidad
          </label>

          <div className="relative">
            <Building2
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select className="w-full appearance-none rounded-md border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="">Search or select entity...</option>
              <option value="1">Empresa Demo</option>
              <option value="2">Vehículo ABC123</option>
              <option value="3">Juan Pérez</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ˅
            </span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
            Categoria
          </label>

          <div className="relative">
            <FolderOpen
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select className="w-full appearance-none rounded-md border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option value="">Select category...</option>
              <option value="seguro">Seguro</option>
              <option value="habilitacion">Habilitación</option>
              <option value="auditoria">Auditoría</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ˅
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
              Fecha de vencimiento
            </label>

            <div className="relative">
              <input
                type="date"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <CalendarDays
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <button
            onClick={() => router.back()}
            className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
}
