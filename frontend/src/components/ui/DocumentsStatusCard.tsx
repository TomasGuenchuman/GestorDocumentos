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
      wrapperClass: "border-gray-200", // Borde normal
      icon: <CheckCircle2 className="text-green-500" size={24} />,
      countClass: "text-slate-900",
      subtextClass: "text-gray-500",
    },
    vencido: {
      wrapperClass: "border-gray-200 border-l-4 border-l-rose-600", // Borde grueso izquierdo
      icon: <AlertCircle className="text-rose-600" size={24} />,
      countClass: "text-rose-600",
      subtextClass: "text-rose-500 font-medium text-xs",
    },
    "por-vencer": {
      wrapperClass: "border-gray-200", // Borde normal
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      countClass: "text-slate-900",
      subtextClass: "text-amber-600 font-medium text-xs",
    },
  };

  const currentStyle = styleConfig[status];

  return (
    <div
      className={`bg-white rounded-lg border p-5 flex flex-col justify-between shadow-sm min-w-[200px] h-[140px] ${currentStyle.wrapperClass}`}
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
          <p className={`mt-1 ${currentStyle.subtextClass}`}>{subtext}</p>
        )}
      </div>
    </div>
  );
}
