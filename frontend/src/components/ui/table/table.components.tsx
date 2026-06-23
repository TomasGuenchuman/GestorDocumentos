import {
  Building2,
  Car,
  CircleMinus,
  FileText,
  MoreVertical,
  UserRound,
  Printer,
} from "lucide-react";

import type { DocumentStatus, DocumentTableRow, TableHeader } from "./Table";

export function getHeaderLabel(header: TableHeader) {
  return typeof header === "string" ? header : header.label;
}

export function getHeaderAlign(header: TableHeader) {
  return typeof header === "string" ? "left" : (header.align ?? "left");
}

export function getHeaderClassName(header: TableHeader) {
  return typeof header === "string" ? "" : (header.className ?? "");
}

export function getAlignClass(align: "left" | "center" | "right") {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

export function DocumentCell({ title, version }: DocumentTableRow["document"]) {
  return (
    <div>
      <p className="font-bold text-blue-950">{title}</p>
      <p className="text-xs text-slate-500">{version}</p>
    </div>
  );
}

export function EntityCell({ title, type }: DocumentTableRow["entity"]) {
  const entityConfig = {
    persona: {
      icon: UserRound,
      label: "Persona",
    },
    empresa: {
      icon: Building2,
      label: "Empresa",
    },
    vehiculo: {
      icon: Car,
      label: "Vehiculo",
    },
  };

  const Icon = entityConfig[type].icon;

  return (
    <div>
      <p className="text-sm text-slate-900">{title}</p>

      <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
        <Icon size={13} />
        <span>{entityConfig[type].label}</span>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: DocumentStatus }) {
  const statusConfig = {
    vigente: {
      label: "Vigente",
      className: "bg-green-100 text-green-700",
    },
    vencido: {
      label: "Vencido",
      className: "bg-red-100 text-red-700",
    },
    "por vencer": {
      label: "Por vencer",
      className: "bg-orange-100 text-orange-700",
    },
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1 text-xs font-bold
        ${statusConfig[status].className}
      `}
    >
      {statusConfig[status].label}
    </span>
  );
}

export function DateCell({
  expiration,
  expired = false,
}: DocumentTableRow["dates"]) {
  return (
    <div className="text-xs leading-5">
      <p className={expired ? "font-bold text-red-600" : "text-slate-800"}>
        {expiration}
      </p>
    </div>
  );
}

export function PdfCell({
  available,
  onClick,
}: {
  available: boolean;
  onClick?: () => void;
}) {
  if (!available) {
    return (
      <div className="flex justify-center text-slate-400">
        <CircleMinus size={18} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex text-blue-950 transition hover:scale-110"
    >
      <FileText size={18} />
    </button>
  );
}

export function ActionsCell({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="rounded-md p-1 text-slate-700 transition hover:scale-110"
      >
        <MoreVertical size={18} />
      </button>

      <button
        type="button"
        onClick={onClick}
        className="rounded-md p-1 text-slate-700 transition hover:scale-110"
      >
        <Printer size={18} />
      </button>
    </>
  );
}
