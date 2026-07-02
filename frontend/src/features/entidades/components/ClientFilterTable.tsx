"use client";

import { useMemo, useState } from "react";
import Table from "@/components/ui/table/Table";
import FiltersBar from "@/features/documentos/components/FiltersBar";
import { EntityTableRow } from "@/features/entidades/types/types";

const rows: EntityTableRow[] = [
  {
    id: 1,
    entity: {
      title: "Juan Carlos Pérez",
      subtitle: "DNI: 20-3549281-9",
      type: "persona",
    },
    documentation: {
      current: 5,
      total: 5,
      warning: 0,
      expired: 0,
    },
    status: "al-dia",
  },
  {
    id: 2,
    entity: {
      title: "Logistics North S.A.",
      subtitle: "CUIT: 30-71238456-0",
      type: "empresa",
    },
    documentation: {
      current: 12,
      total: 15,
      warning: 0,
      expired: 3,
    },
    status: "vencimientos",
  },
  {
    id: 3,
    entity: {
      title: "Scania R450",
      subtitle: "Patente AB-123-CD",
      type: "vehiculo",
    },
    documentation: {
      current: 3,
      total: 4,
      warning: 1,
      expired: 0,
    },
    status: "atencion",
  },
  {
    id: 4,
    entity: {
      title: "Trailer T-0092",
      subtitle: "Sider Fleet 02",
      type: "vehiculo",
    },
    documentation: {
      current: 0,
      total: 2,
      warning: 0,
      expired: 0,
    },
    status: "sin-cargar",
  },
  {
    id: 5,
    entity: {
      title: "María Fernández",
      subtitle: "DNI: 27-33445566-8",
      type: "persona",
    },
    documentation: {
      current: 4,
      total: 5,
      warning: 1,
      expired: 0,
    },
    status: "atencion",
  },
  {
    id: 6,
    entity: {
      title: "Constructora del Sur S.R.L.",
      subtitle: "CUIT: 30-70123456-9",
      type: "empresa",
    },
    documentation: {
      current: 8,
      total: 10,
      warning: 0,
      expired: 2,
    },
    status: "vencimientos",
  },
];

/* FILTTROS */
const filters = [
  {
    id: "type",
    label: "Tipo",
    options: [
      { label: "Persona", value: "persona" },
      { label: "Empresa", value: "empresa" },
      { label: "Vehículo", value: "vehiculo" },
    ],
  },
  {
    id: "status",
    label: "Estado",
    options: [
      { label: "Al día", value: "al-dia" },
      { label: "Atención", value: "atencion" },
      { label: "Con vencimientos", value: "vencimientos" },
      { label: "Sin cargar", value: "sin-cargar" },
    ],
  },
];
export default function ClientFilterTable() {
  const [filterValues, setFilterValues] = useState({
    type: "",
    status: "",
  });

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilterValues({
      type: "",
      status: "",
    });
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesType =
        !filterValues.type || row.entity.type === filterValues.type;

      const matchesStatus =
        !filterValues.status || row.status === filterValues.status;

      return matchesType && matchesStatus;
    });
  }, [filterValues]);

  return (
    <>
      <FiltersBar
        filters={filters}
        values={filterValues}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />
      <Table
        headers={[
          "Entidad",
          "Tipo Documentación",
          {
            label: "Estado Global",
            align: "center",
          },
          {
            label: "Acciones",
            align: "center",
          },
        ]}
        rows={filteredRows}
      />
    </>
  );
}
