export type EntityType = "persona" | "empresa" | "vehiculo";

export type GlobalStatus =
  | "al-dia"
  | "atencion"
  | "vencimientos"
  | "sin-cargar";

export type EntityTableRow = {
  id: number | string;

  entity: {
    title: string;
    subtitle: string;
    type: EntityType;
  };

  documentation: {
    current: number;
    total: number;
    warning: number;
    expired: number;
  };

  status: GlobalStatus;
};