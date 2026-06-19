import { Building2, Car, FileText, MoreVertical, UserRound, CircleMinus } from "lucide-react";

type Status = "vigente" | "vencido" | "por vencer";

export function StatusBadge({ status }: { status: Status }) {
  const styles = {
    vigente: "bg-green-100 text-green-700",
    vencido: "bg-red-100 text-red-700",
    "por vencer": "bg-orange-100 text-orange-700",
  };

  const labels = {
    vigente: "Vigente",
    vencido: "Vencido",
    "por vencer": "Por vencer",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1 text-xs font-bold
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}

export function DocumentCell({
  title,
  version,
}: {
  title: string;
  version: string;
}) {
  return (
    <div>
      <p className="font-bold text-blue-950">{title}</p>
      <p className="text-xs text-slate-500">{version}</p>
    </div>
  );
}

export function EntityCell({
  title,
  type,
}: {
  title: string;
  type: "person" | "company" | "vehicle";
}) {
  const icons = {
    person: UserRound,
    company: Building2,
    vehicle: Car,
  };

  const labels = {
    person: "Person",
    company: "Company",
    vehicle: "Vehicle",
  };

  const Icon = icons[type];

  return (
    <div>
      <p className="text-sm text-slate-900">{title}</p>
      <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
        <Icon size={13} />
        <span>{labels[type]}</span>
      </div>
    </div>
  );
}

export function DateCell({
  emission,
  expiration,
  expired = false,
}: {
  emission: string;
  expiration: string;
  expired?: boolean;
}) {
  return (
    <div className="text-xs leading-5">
      <p className="text-slate-800">{emission}</p>
      <p className={expired ? "font-bold text-red-600" : "text-slate-800"}>
        {expiration}
      </p>
    </div>
  );
}

export function PdfCell({ available = true }: { available?: boolean }) {
  if (!available) {
    return (
      <div className="flex justify-center text-slate-400">
        <CircleMinus size={18} />
      </div>
    );
  }

  return (
    <button className="inline-flex text-blue-950 transition hover:scale-110">
      <FileText size={18} />
    </button>
  );
}

export function ActionsCell() {
  return (
    <button className="rounded-md p-1 text-slate-700 transition hover:bg-slate-100">
      <MoreVertical size={18} />
    </button>
  );
}