"use client";

import { useState } from "react";
import { Building2, Car, User } from "lucide-react";

import EmpresaForm from "./EmpresaForm";
import PersonaForm from "./PersonaForm";
import VehiculoForm from "./VehiculoForm";

type EntityType = "empresa" | "vehiculo" | "persona";

const options = [
  {
    value: "empresa",
    label: "Empresa",
    icon: Building2,
  },
  {
    value: "vehiculo",
    label: "Vehículo",
    icon: Car,
  },
  {
    value: "persona",
    label: "Persona",
    icon: User,
  },
] satisfies {
  value: EntityType;
  label: string;
  icon: typeof Building2;
}[];

export default function NuevoEntidadForm() {
  const [selected, setSelected] = useState<EntityType>("empresa");

  return (
    <>
      <div className="flex flex-col">
        {/* Selector */}

        <div className="px-8 py-2">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Tipo de entidad
          </label>

          <div className="flex gap-4">
            {options.map((option) => {
              const Icon = option.icon;

              const active = selected === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelected(option.value)}
                  className={[
                    "group relative flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border p-6 transition-all",
                    active
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <Icon
                    size={34}
                    className={
                      active
                        ? "text-blue-600"
                        : "text-slate-500 group-hover:text-slate-700"
                    }
                  />

                  <span
                    className={
                      active
                        ? "font-semibold text-blue-600"
                        : "font-medium text-slate-700"
                    }
                  >
                    {option.label}
                  </span>

                  {active && (
                    <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Formulario */}

        <div className="px-8 py-8">
          {selected === "empresa" && <EmpresaForm />}

          {selected === "persona" && <PersonaForm />}

          {selected === "vehiculo" && <VehiculoForm />}
        </div>
      </div>
    </>
  );
}
