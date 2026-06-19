"use client";
import Table, { type DocumentTableRow } from "@/components/ui/table/Table";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

const documents: DocumentTableRow[] = [
  {
    id: 1,
    document: {
      title: "Licencia",
      version: "v1.0",
    },
    entity: {
      title: "Juan Pérez",
      type: "persona",
    },
    status: "vigente",
    dates: {
      expiration: "15/01/2028",
    },
    pdf: {
      available: true,
    },
  },
  {
    id: 2,
    document: {
      title: "Habilitación",
      version: "v2.1",
    },
    entity: {
      title: "Transporte Austral",
      type: "empresa",
    },
    status: "vencido",
    dates: {
      expiration: "10/10/2023",
      expired: true,
    },
    pdf: {
      available: true,
    },
  },
  {
    id: 3,
    document: {
      title: "Seguro",
      version: "v1.0",
    },
    entity: {
      title: "AB123CD",
      type: "vehiculo",
    },
    status: "vigente",
    dates: {
      expiration: "01/03/2025",
    },
    pdf: {
      available: false,
    },
  },
  {
    id: 4,
    document: {
      title: "Constancia fiscal",
      version: "v3.0",
    },
    entity: {
      title: "Logística Sur",
      type: "empresa",
    },
    status: "vigente",
    dates: {
      expiration: "05/01/2025",
    },
    pdf: {
      available: true,
    },
  },
  {
    id: 5,
    document: {
      title: "VTV",
      version: "v1.0",
    },
    entity: {
      title: "AC456EF",
      type: "vehiculo",
    },
    status: "por vencer",
    dates: {
      expiration: "20/11/2024",
      expired: true,
    },
    pdf: {
      available: true,
    },
  },
];

export default function Documentos() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <header className="shrink-0 flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold text-slate-800">Documentos</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Cargar Nuevo Documento
        </Button>
      </header>
      <div>FILTROS</div>
      <Table rows={documents} />
    </div>
  );
}
