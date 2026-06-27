type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

const sizeClasses = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

export default function Spinner({
  size = "md",
  text = "Cargando...",
  fullScreen = false,
}: SpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-slate-300
          border-t-slate-900
        `}
      />

      {text && <p className="text-sm font-medium text-slate-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return content;
}
