"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Building2, ClipboardList } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Documentos", href: "/documentos", icon: FileText },
  { name: "Entidades", href: "/entidades", icon: Building2 },
  { name: "Trámites", href: "/tramites", icon: ClipboardList },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`bg-slate-800 text-white flex-shrink-0 transition-all duration-300 flex flex-col relative
        ${isOpen ? "w-64" : "w-16"} 
      `}
    >
      {/* Cabecera del Sidebar */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700 overflow-hidden whitespace-nowrap">
        <h2 className="font-bold text-xl transition-opacity duration-300">
          {isOpen ? "Gestión Docs" : "GD"}
        </h2>
      </div>

      {/* Contenedor de Links */}
      <nav className="flex-1 py-4 flex flex-col gap-2 overflow-hidden px-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-md transition-colors whitespace-nowrap
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }
              `}
            >
              {/* El ícono siempre mantiene su tamaño */}
              <Icon size={20} className="flex-shrink-0" />

              {/* El texto se oculta/muestra dependiendo del estado */}
              <span
                className={`transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
