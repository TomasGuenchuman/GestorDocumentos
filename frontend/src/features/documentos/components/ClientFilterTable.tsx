"use client";

import Table from "@/components/ui/table/Table";
import FiltersBar from "@/features/documentos/components/FiltersBar";

// datos MOCK
import { documents } from "@/features/documentos/mook/documentos.mock";
import { mockFilters } from "@/features/documentos/mook/filtro.mock";

export default function ClientFilterTable() {
  return (
    <>
      <FiltersBar filters={mockFilters} />
      <Table rows={documents} />{" "}
    </>
  );
}
