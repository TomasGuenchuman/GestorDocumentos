"use client";

import {
  getHeaderLabel,
  getHeaderAlign,
  getHeaderClassName,
  getAlignClass,
  DocumentCell,
  EntityCell,
  StatusBadge,
  DateCell,
  PdfCell,
  ActionsCell,
} from "./table.components";

type EntityType = "persona" | "empresa" | "vehiculo";
export type DocumentStatus = "vigente" | "vencido" | "por vencer";

export type TableHeader =
  | string
  | {
      label: string;
      align?: "left" | "center" | "right";
      className?: string;
    };

export type DocumentTableRow = {
  id: string | number;

  document: {
    title: string;
    version: string;
  };

  entity: {
    title: string;
    type: EntityType;
  };

  status: DocumentStatus;

  dates: {
    expiration: string;
    expired?: boolean;
  };

  pdf: {
    available: boolean;
  };
};

type TableProps = {
  headers?: TableHeader[];
  rows: DocumentTableRow[];
  emptyMessage?: string;
  className?: string;

  onPdfClick?: (row: DocumentTableRow) => void;
  onActionClick?: (row: DocumentTableRow) => void;
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
  onPdfClick,
  onActionClick,
}: TableProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
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
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-4 align-middle">
                    <DocumentCell
                      title={row.document.title}
                      version={row.document.version}
                    />
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <EntityCell
                      title={row.entity.title}
                      type={row.entity.type}
                    />
                  </td>

                  <td className="px-5 py-4 text-center align-middle">
                    <StatusBadge status={row.status} />
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <DateCell
                      expiration={row.dates.expiration}
                      expired={row.dates.expired}
                    />
                  </td>

                  <td className="px-5 py-4 text-center align-middle">
                    <PdfCell
                      available={row.pdf.available}
                      onClick={() => onPdfClick?.(row)}
                    />
                  </td>

                  <td className="px-5 py-4 text-center align-middle">
                    <ActionsCell onClick={() => onActionClick?.(row)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
