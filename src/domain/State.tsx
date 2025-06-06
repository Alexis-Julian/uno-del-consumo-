import Jugador from "./Jugador";
import Baraja from "./Baraja";
import type { AccionStrategy } from "./AccionStrategy";
import type { AnyCard } from "../types/card";

export default class stateVacio {
  //Actuales jugadores
  jugadores: Jugador[];
  //Turno del jugador actual
  turno: number;
  //Baraja con la que se esta jugando la partida
  baraja: Baraja;
  cartas_usadas: AnyCard[];
  //Carta actual en mesa
  cartaActual: null | AnyCard;
  colorActual: string;
  //Deuda colectiva
  deuda_colectiva: number;
  //Jugador pausado por no haber tenido carta

  //Flujo de la ronda
  flujo: "normal" | "invertido";
  acciones_utilizadas: AccionStrategy[];
  puede_robar: boolean;
  puede_pasar: boolean;
  puede_jugar_nuevamente: boolean;
  //

  //
  ganador: null | Jugador;
  finalizado: boolean;
  constructor() {
    this.jugadores = [new Jugador("PEPE"), new Jugador("CPU")];
    this.baraja = new Baraja();
    this.cartaActual = null;
    this.colorActual = "";
    this.turno = 0;
    this.deuda_colectiva = 0;
    /* this.jugador_pausado = false; */
    this.flujo = "normal";
    this.acciones_utilizadas = [];
    this.puede_robar = false;
    this.puede_pasar = false;
    this.puede_jugar_nuevamente = false;
    this.ganador = null;
    this.finalizado = false;
    this.cartas_usadas = [];
  }
}
