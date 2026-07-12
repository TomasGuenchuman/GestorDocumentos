import { api } from "@/lib/api/axios";

type EntidadVehiculo = {
    id: number;
    patente: string;
    marca: string;
    modelo: string;
}

type EntidadPersona = {
    id:number;
    nombre: string;
    apellido: string;
    dni: string;
}

type EntidadEmpresa = {
    id: number;
    razonSocial: string;
    cuit: string;
}

type EntidadDocumentation = {
    current: number;
    warning: number;
    expired: number;
    total: number;
}

export type Entidad = {
    id: number;
    tipo: string;
    detalle: EntidadVehiculo | EntidadPersona | EntidadEmpresa;
    documentation: EntidadDocumentation;
    status: string;
}

export const EntidadService = {

    async inicialData(): Promise<Entidad[]> {
        const { data } = await api.get<Entidad[]>('/entidades/data');
        return data;
    }
}