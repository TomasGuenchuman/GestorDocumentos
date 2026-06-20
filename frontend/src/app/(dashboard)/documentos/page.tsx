import Table from "@/components/ui/table/Table";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
// datos MOCK
import { documents } from "@/features/documentos/mook/documentos.mock";

export default function Documentos() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <header className="shrink-0 flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold text-slate-800">Documentos</h1>
        <Button variant="primary" icon={<Plus size={18} />}>
          Cargar Nuevo Documento
        </Button>
      </header>
      <div className="flex flex-row">
        <div>FILTROS</div>
        <div>asdasdd</div>
      </div>
      <Table rows={documents} />
    </div>
  );
}
