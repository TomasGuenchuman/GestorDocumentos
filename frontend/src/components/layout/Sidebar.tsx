"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`bg-slate-800 text-white flex-shrink-0 transition-all duration-300 flex flex-col relative
        ${isOpen ? "w-64" : "w-16"} 
      `}
    >
      <div className="p-4 overflow-hidden whitespace-nowrap">
        {isOpen ? <h2>Mi Proyecto</h2> : <h2>MP</h2>}
        {/* Aquí irían tus links */}
      </div>
    </aside>
  );
}
