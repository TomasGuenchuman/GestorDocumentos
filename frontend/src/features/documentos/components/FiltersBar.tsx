"use client";

import { Funnel, X } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type Filter = {
  id: string;
  label: string;
  options: FilterOption[];
};

type FiltersBarProps = {
  filters: Filter[];
  values: Record<string, string>;
  onChange: (filterId: string, value: string) => void;
  onClear?: () => void;
};

export default function FiltersBar({
  filters,
  values,
  onChange,
  onClear,
}: FiltersBarProps) {
  const hasActiveFilters = Object.values(values).some(Boolean);

  return (
    <div className="flex flex-wrap items-center gap-4 border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-2 whitespace-nowrap text-gray-700">
        <Funnel size={18} />
        <span className="font-medium">Filtros:</span>
      </div>

      {filters.map((filter) => (
        <select
          key={filter.id}
          value={values[filter.id] ?? ""}
          onChange={(event) => onChange(filter.id, event.target.value)}
          className="h-10 min-w-[140px] border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-gray-500"
        >
          <option value="">{filter.label}</option>

          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}

      {hasActiveFilters && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex h-10 items-center gap-2 border border-gray-300 bg-white px-3 text-sm text-gray-700 transition hover:bg-gray-100"
        >
          <X size={16} />
          Limpiar
        </button>
      )}
    </div>
  );
}
