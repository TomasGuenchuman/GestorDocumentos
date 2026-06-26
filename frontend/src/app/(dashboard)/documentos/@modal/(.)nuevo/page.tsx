import { FileText } from "lucide-react";
import RouteModal from "@/components/ui/RouteModal";
import NuevoDocumentoForm from "@/features/documentos/components/NuevoDocumentoForm";

export default function NuevoDocumento() {
  return (
    <RouteModal
      title="Datos del documento"
      icon={<FileText size={22} className="text-slate-700" />}
    >
      <NuevoDocumentoForm />
    </RouteModal>
  );
}
