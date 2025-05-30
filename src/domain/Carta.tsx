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

abstract class Card {
  static idUnique = 0;
  public comment: string;
  public type: string;
  public color: string;
  public id: number;

  constructor(comment: string, type: string, color: string) {
    this.comment = comment;
    this.type = type;
    this.color = color;
    this.id = ++Card.idUnique;
  }
}

export class ActionCard extends Card {
  public action: AccionStrategy;
  public action_name: string;
  constructor(
    comment: string,
    type: string,
    color: string,
    action: AccionStrategy,
    action_name: string
  ) {
    super(comment, type, color);
    this.action = action;
    this.action_name = action_name;
  }
}
export class CommunCard extends Card {
  number: number;
  feeling: string;
  constructor(
    comment: string,
    type: string,
    color: string,
    number: number,
    feeling: string
  ) {
    super(comment, type, color);
    this.number = number;
    this.feeling = feeling;
  }
}
