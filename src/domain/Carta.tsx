import type { AccionStrategy } from "./AccionStrategy";
// Discriminador de tipos
export type TipoCarta = "comun" | "accion" | "comodin";
export type NombreAccion = "TENTACION" | "REVERSA" | "SILENCIO";

//CREAR UNA CLASE DE CADA TIPO
export class CartaComodin {
  tipo: TipoCarta;
  accion: AccionStrategy;
  constructor(accion: AccionStrategy) {
    this.tipo = "comodin";
    this.accion = accion;
  }
}

export class CartaAccion {
  tipo: TipoCarta;
  accion: AccionStrategy;
  nombre_accion: NombreAccion;
  color: string;
  sentimiento: string;
  mensaje: string;

  constructor(
    color: string,
    sentimiento: string,
    accion: AccionStrategy,
    mensaje: string,
    nombre_accion: NombreAccion
  ) {
    this.tipo = "accion";
    this.color = color;
    this.sentimiento = sentimiento;
    this.accion = accion;
    this.mensaje = mensaje;
    this.nombre_accion = nombre_accion;
  }
}

export class CartaComun {
  tipo: "comun";
  color: string;
  sentimiento: string;
  numero: number;
  mensaje: string;
  constructor(
    sentimiento: string,
    color: string,
    mensaje: string,
    numero: number
  ) {
    this.mensaje = mensaje;
    this.tipo = "comun";
    this.color = color;
    this.sentimiento = sentimiento;
    this.numero = numero;
  }
}

// Unión total
export type CualquierCarta = CartaComun | CartaAccion | CartaComodin;
