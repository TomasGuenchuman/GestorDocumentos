import {
  getHeaderLabel,
  getHeaderAlign,
  getHeaderClassName,
  getAlignClass,
  DocumentCell,
  EntityCell,
  StatusBadge,
  DateCell,
} from "./table.components";
import { PdfClientCell, ActionsClientCell } from "./ClientCells";
import { Entidad } from "@/features/entidades/api/entidad.service";
import { Building2, Truck, User, FolderOpen, Pencil, Eye } from "lucide-react";

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

function isDocumentRow(
  row: DocumentTableRow | Entidad,
): row is DocumentTableRow {
  return "document" in row;
}

function isEntityRow(row: DocumentTableRow | Entidad): row is Entidad {
  return "documentation" in row;
}

function getEntityDisplay(row: Entidad) {
  switch (row.tipo) {
    case "persona":
      return {
        title: row.detalle.nombre,
        subtitle: row.detalle.dni,
        icon: <User size={20} />,
      };

    case "empresa":
      return {
        title: row.detalle.razonSocial,
        subtitle: row.detalle.cuit,
        icon: <Building2 size={20} />,
      };

    case "vehiculo":
      return {
        title: row.detalle.patente,
        subtitle: row.detalle.modelo,
        icon: <Truck size={20} />,
      };
  }
}

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

          hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
      "
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
            ) : (
              rows.map((row) => {
                const entityDisplay = isEntityRow(row)
                  ? getEntityDisplay(row)
                  : null;
                return (
                  <tr
                    key={row.id}
                    className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                  >
                    {isDocumentRow(row) ? (
                      <>
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
                          <PdfClientCell row={row} />
                        </td>

                        <td className="px-5 py-4 text-center align-middle">
                          <ActionsClientCell row={row} />
                        </td>
                      </>
                    ) : isEntityRow(row) ? (
                      <>
                        {/* Entidad */}
                        <td className="px-5 py-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                              {entityDisplay?.icon}
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate text-wrap">
                                {entityDisplay?.title}
                              </p>

                              <p className="text-sm text-slate-500 truncate text-wrap">
                                {entityDisplay?.subtitle}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Tipo documentación */}
                        <td className="px-5 py-4 align-middle">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                              <span className="whitespace-nowrap text-sm text-slate-600">
                                {row.documentation.current}/
                                {row.documentation.total} Vigentes
                              </span>

                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                                <div
                                  className={`h-full transition-all ${
                                    row.documentation.expired > 0
                                      ? "bg-red-500"
                                      : row.documentation.warning > 0
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                  style={{
                                    width: `${
                                      (row.documentation.current /
                                        row.documentation.total) *
                                      100
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>

                            {row.documentation.expired > 0 && (
                              <span className="text-xs text-red-500">
                                ({row.documentation.expired} vencidos)
                              </span>
                            )}

                            {row.documentation.warning > 0 && (
                              <span className="text-xs text-amber-500">
                                ({row.documentation.warning} próximos a vencer)
                              </span>
                            )}

                            {row.documentation.expired === 0 &&
                              row.documentation.warning === 0 && (
                                <span className="text-xs text-emerald-600">
                                  Documentación completa
                                </span>
                              )}
                          </div>
                        </td>

                        {/* Estado */}
                        <td className="px-5 py-4 text-center align-middle">
                          {row.status === "al-dia" && (
                            <span className="inline-flex items-center gap-2 rounded-md bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              Al día
                            </span>
                          )}

                          {row.status === "warning" && (
                            <span className="inline-flex items-center gap-2 rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                              <span className="h-2 w-2 rounded-full bg-amber-500" />
                              Proximo a vencer
                            </span>
                          )}

                          {row.status === "expired" && (
                            <span className="inline-flex items-center gap-2 rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              <span className="h-2 w-2 rounded-full bg-red-500" />
                              Con vencimientos
                            </span>
                          )}

                          {row.status === "sin-cargar" && (
                            <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              <span className="h-2 w-2 rounded-full bg-slate-400" />
                              Sin cargar
                            </span>
                          )}
                        </td>

                        {/* Acciones */}
                        <td className="px-5 py-4 align-middle">
                          <div className="flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                              title="Documentación"
                            >
                              <FolderOpen size={18} />
                            </button>

                            <button
                              className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                              title="Ver detalle"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
