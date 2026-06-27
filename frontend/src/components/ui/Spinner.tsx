type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-11 w-11 border-[3px]",
};

export default function Spinner({
  size = "md",
  text = "Cargando...",
  fullScreen = false,
}: SpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            animate-spin
            rounded-full
            border-slate-200
            border-t-slate-800
          `}
        />

        <div className="absolute inset-0 rounded-full shadow-sm" />
      </div>

      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
        <section className="flex min-h-40 w-full max-w-xs items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
          {content}
        </section>
      </main>
    );
  }

  return content;
}
