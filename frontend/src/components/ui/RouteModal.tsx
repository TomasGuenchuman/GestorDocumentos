"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type RouteModalProps = {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  panelClassName?: string;
  closeOnBackdrop?: boolean;
};

export default function RouteModal({
  children,
  title,
  icon,
  panelClassName = "",
  closeOnBackdrop = true,
}: RouteModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  const panelClasses = [
    "relative w-full max-w-[430px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl",
    panelClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={closeOnBackdrop ? handleClose : undefined}
    >
      <section
        className={panelClasses}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        {(title || icon) && (
          <div className="mb-4 flex items-center gap-2 pr-8">
            {icon}
            {title && (
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            )}
          </div>
        )}

        {children}
      </section>
    </div>
  );
}
