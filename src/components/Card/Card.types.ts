import { type NombreAccion } from "../../domain/Carta";

export interface CardProps {
  sentimiento?: string;
  numero?: number;
  mensaje?: string;
  nombre_accion?: NombreAccion;
}
