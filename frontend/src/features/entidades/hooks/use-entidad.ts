import { useQuery } from "@tanstack/react-query";
import { EntidadService } from "@/features/entidades/api/entidad.service";

export function useInicialData() {
  return useQuery({
    queryKey: ["entidades"],
    queryFn: EntidadService.inicialData,
  });
}
