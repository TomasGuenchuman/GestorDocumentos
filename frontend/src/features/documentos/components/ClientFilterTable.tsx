"use client";

import { useMemo, useState } from "react";

import Table, { type DocumentTableRow } from "@/components/ui/table/Table";
import FiltersBar from "@/features/documentos/components/FiltersBar";

// datos MOCK
import { documents } from "@/features/documentos/mook/documentos.mock";
import { mockFilters } from "@/features/documentos/mook/filtro.mock";

type ActiveFilters = Record<string, string>;

function matchesFilter(
  row: DocumentTableRow,
  filterId: string,
  filterValue: string,
) {
  if (!filterValue) return true;

  switch (filterId) {
    case "status":
      return row.status === filterValue;

    case "entity.type":
      return row.entity.type === filterValue;

    case "pdf.available":
      return String(row.pdf.available) === filterValue;

    case "document.title":
      return row.document.title === filterValue;

    default:
      return true;
  }
}

export default function ClientFilterTable() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const filteredDocuments = useMemo(() => {
    return documents.filter((row) => {
      return Object.entries(activeFilters).every(([filterId, filterValue]) =>
        matchesFilter(row, filterId, filterValue),
      );
    });
  }, [activeFilters]);

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  return (
    <>
      <FiltersBar
        filters={mockFilters}
        values={activeFilters}
        onChange={handleFilterChange}
        onClear={clearFilters}
      />
      <Table rows={filteredDocuments} />
    </>
  );
}
