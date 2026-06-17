import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

export type DocumentStatus = "vigente" | "vencido" | "por-vencer";

interface DocumentStatusCardProps {
  status: DocumentStatus;
  title: string;
  count: number;
  subtext?: string;
  onclick?: () => void;
}

export default function DocumentStatusCard({
  status,
  title,
  count,
  subtext,
}: DocumentStatusCardProps) {
  // Diccionario de configuración visual según el estado
  const styleConfig = {
    vigente: {
      wrapperClass: "border-l-4 border-l-green-500",
      textClass: "text-green-700 font-medium",
      countClass: "text-slate-900",
      subtextClass: "text-gray-500",
    },
    vencido: {
      wrapperClass: "border-l-4 border-l-red-500",
      textClass: "text-red-600 font-semibold",
      icon: <AlertCircle className="text-rose-600" size={24} />,
      countClass: "text-rose-600",
      subtextClass: "text-rose-500 font-medium text-xs",
    },
    "por-vencer": {
      wrapperClass: "border-l-4 border-l-orange-500",
      textClass: "text-orange-600 font-medium",
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      countClass: "text-slate-900",
      subtextClass: "text-amber-600 font-medium text-xs",
    },
  };

  const currentStyle = styleConfig[status];

  return (
    <div
      className={`bg-white rounded-lg border p-5 flex flex-col justify-between shadow-sm flex-1 min-w-[200px] max-w-[400px] h-[140px] ${currentStyle.wrapperClass}`}
    >
      {/* Cabecera: Icono y Título */}
      <div className="flex justify-between items-start w-full">
        {currentStyle.icon}
        <span className="text-sm font-medium text-slate-600">{title}</span>
      </div>

      {/* Contenido: Número y Subtexto/Barra */}
      <div className="mt-4">
        <h3 className={`text-3xl font-bold ${currentStyle.countClass}`}>
          {count}
        </h3>

        {/* Renderizado condicional del subtexto */}
        {subtext && (
          <p className={`text-xs md:text-sm mt-1 ${currentStyle.textClass}`}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
