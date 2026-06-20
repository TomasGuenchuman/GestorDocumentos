import { DocumentTableRow } from "@/components/ui/table/Table";
export const documents: DocumentTableRow[] = [
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