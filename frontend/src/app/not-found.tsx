import Link from "next/link";
import { ArrowLeft, Compass, FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />

      {/* Grid sutil */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Blobs animados */}
      <div className="absolute left-10 top-10 h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-56 w-56 animate-pulse rounded-full bg-cyan-400/20 blur-3xl [animation-delay:700ms]" />
      <div className="absolute right-1/3 top-1/4 h-32 w-32 animate-ping rounded-full bg-white/10 blur-2xl" />

      {/* Partículas */}
      <div className="absolute left-[12%] top-[22%] h-2 w-2 animate-bounce rounded-full bg-blue-300/70" />
      <div className="absolute right-[18%] top-[28%] h-2 w-2 animate-bounce rounded-full bg-cyan-300/70 [animation-delay:300ms]" />
      <div className="absolute bottom-[24%] left-[22%] h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:500ms]" />
      <div className="absolute bottom-[18%] right-[28%] h-1.5 w-1.5 animate-bounce rounded-full bg-blue-200/70 [animation-delay:700ms]" />

      <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Icono principal */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-3xl bg-blue-500/20" />

          <div className="relative flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md">
            <FileQuestion size={38} className="text-blue-100" />
          </div>

          <div className="absolute -right-3 -top-3 flex h-8 w-8 animate-spin items-center justify-center rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md [animation-duration:4s]">
            <Compass size={16} className="text-cyan-200" />
          </div>
        </div>

        {/* 404 */}
        <div className="relative mb-4">
          <h1 className="select-none text-8xl font-black tracking-tighter text-white drop-shadow-2xl sm:text-9xl">
            404
          </h1>

          <div className="absolute inset-x-0 bottom-1 mx-auto h-3 w-40 animate-pulse rounded-full bg-blue-400/40 blur-xl" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200/80">
          Ruta no encontrada
        </p>

        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Parece que te fuiste fuera del mapa
        </h2>

        <p className="mb-9 max-w-md text-sm leading-7 text-slate-300">
          La página que intentás abrir no existe, fue movida o la URL está mal
          escrita. Podés volver al inicio y continuar desde una ruta válida.
        </p>

        {/* Botones */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-blue-950/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-2xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Home
              size={17}
              className="transition duration-300 group-hover:scale-110"
            />
            Volver al inicio
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <ArrowLeft
              size={17}
              className="transition duration-300 group-hover:-translate-x-1"
            />
            Ir al home
          </Link>
        </div>
      </section>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </main>
  );
}
