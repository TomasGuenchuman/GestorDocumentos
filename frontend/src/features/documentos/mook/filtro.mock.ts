export const mockFilters = [
  {
    id: "status",
    label: "Estado",
    options: [
      {
        label: "Vigente",
        value: "vigente",
      },
      {
        label: "Vencido",
        value: "vencido",
      },
      {
        label: "Por vencer",
        value: "por vencer",
      },
    ],
  },
  {
    id: "entity.type",
    label: "Tipo de entidad",
    options: [
      {
        label: "Persona",
        value: "persona",
      },
      {
        label: "Empresa",
        value: "empresa",
      },
      {
        label: "Vehículo",
        value: "vehiculo",
      },
    ],
  },
  {
    id: "pdf.available",
    label: "PDF",
    options: [
      {
        label: "Con PDF",
        value: "true",
      },
      {
        label: "Sin PDF",
        value: "false",
      },
    ],
  },
];