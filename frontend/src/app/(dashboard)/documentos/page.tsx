"use client";
import Table, { type DocumentTableRow } from "@/components/ui/table/Table";

const documents: DocumentTableRow[] = [
  {
    id: 1,
    document: {
      title: "Licencia",
      version: "v1.0",
    },
    entity: {
      title: "Juan Pérez",
      type: "person",
    },
    category: "Legal",
    status: "vigente",
    dates: {
      emission: "15/01/2023",
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
      type: "company",
    },
    category: "Operativa",
    status: "vencido",
    dates: {
      emission: "10/10/2022",
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
      type: "vehicle",
    },
    category: "Seguros",
    status: "vigente",
    dates: {
      emission: "01/03/2024",
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
      type: "company",
    },
    category: "Fiscal",
    status: "vigente",
    dates: {
      emission: "05/01/2024",
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
      type: "vehicle",
    },
    category: "Técnica",
    status: "por vencer",
    dates: {
      emission: "20/11/2023",
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
      <header>GESTIOND E DOCUMENTOS - BOton CARgar Doucmento</header>
      <div>FILTROS</div>
      <Table
        rows={documents}
        onPdfClick={(row) => {
          console.log("Abrir PDF:", row);
        }}
        onActionClick={(row) => {
          console.log("Abrir acciones:", row);
        }}
      />
    </div>
  );
}
