import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Trasladamos el flex horizontal aquí para alinear el Sidebar y el contenido
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      {/* flex-1 hace que ocupe todo el ancho sobrante a la derecha del sidebar */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
