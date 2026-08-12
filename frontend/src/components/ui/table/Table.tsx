import {
  getHeaderLabel,
  getHeaderAlign,
  getHeaderClassName,
  getAlignClass,
} from "./table.components";

import { Entidad } from "@/features/entidades/api/entidad.service";
import { DocumentTableRow } from "@/components/ui/table/Table"; // ajustá el import según dónde tengas definido el tipo

import { EntidadesTbody } from "@/features/entidades/components/EntidadesTable";
import { DocumentsTbody } from "@/features/documentos/components/Documentostable";

export type TableHeader =
  | string
  | {
      label: string;
      align?: "left" | "center" | "right";
      className?: string;
    };

type TableProps = {
  headers?: TableHeader[];
  rows: DocumentTableRow[] | Entidad[];
  emptyMessage?: string;
  className?: string;
};

const DEFAULT_HEADERS: TableHeader[] = [
  "Documento",
  "Entidad",
  {
    label: "Estado",
    align: "center",
  },
  "Vencimiento",
  {
    label: "PDF",
    align: "center",
  },
  {
    label: "Acciones",
    align: "center",
  },
];

export default function Table({
  headers = DEFAULT_HEADERS,
  rows,
  emptyMessage = "No hay datos para mostrar.",
  className = "",
}: TableProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
    >
      <div
        className="h-full flex flex-wrap w-full overflow-x-auto
          [scrollbar-width:thin]
          [scrollbar-color:#cbd5e1_transparent]
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-slate-300
          hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0">
            <tr className="bg-slate-100">
              {headers.map((header, index) => {
                const align = getHeaderAlign(header);

                return (
                  <th
                    key={index}
                    className={`
                      px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-700
                      ${getAlignClass(align)}
                      ${getHeaderClassName(header)}
                    `}
                  >
                    {getHeaderLabel(header)}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-5 py-8 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : Array.isArray(rows) && "documentation" in rows[0] ? (
              <EntidadesTbody rows={rows as Entidad[]} />
            ) : (
              <DocumentsTbody rows={rows as DocumentTableRow[]} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
