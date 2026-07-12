"use client";

import { useMemo, useState, useEffect } from "react";
import Table from "@/components/ui/table/Table";
import FiltersBar from "@/features/documentos/components/FiltersBar";
import { EntityTableRow } from "@/features/entidades/types/types";
import { Entidad } from "@/features/entidades/api/entidad.service";

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
      { label: "Proximo a vencer", value: "warning" },
      { label: "vencidos", value: "expired" },
      { label: "Sin cargar", value: "sin-cargar" },
    ],
  },
];

type ClientFilterTableProps = {
  data: Entidad[];
};

export default function ClientFilterTable({ data }: ClientFilterTableProps) {
  const [filterValues, setFilterValues] = useState({
    type: "",
    status: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
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
    return data.filter((row) => {
      const matchesType = !filterValues.type || row.tipo === filterValues.type;

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
