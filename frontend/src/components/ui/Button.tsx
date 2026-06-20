import { ButtonHTMLAttributes, ReactNode } from "react";

// 1. Definimos los tipos de las props específicas de tu componente
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}: ButtonProps) {
  // Estilos base que comparten todos los botones
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2.5";

  // Variantes de diseño
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline:
      "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Si se pasa un icono, lo renderiza a la izquierda del texto */}
      {icon && (
        <span className="mr-2 flex items-center justify-center">{icon}</span>
      )}
      {children}
    </button>
  );
}
