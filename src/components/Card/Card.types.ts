import type { actions } from "../../types/card";

export interface CardProps {
  sentimiento?: string;
  numero?: number;
  mensaje?: string;
  nombre_accion?: actions;
}
