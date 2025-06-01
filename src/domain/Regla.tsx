import EstadoVacio from "./Estado";
import type { AccionStrategy } from "./AccionStrategy";

import { RULES_VACIO } from "../constants/reglas";
import Swal from "sweetalert2";

export interface Rule {
  acciones_validas(estado: EstadoVacio): AccionStrategy[];
  turno_siguiente(estado: EstadoVacio): void;
  hay_ganador(estado: EstadoVacio): boolean;
  puede_cantar(estado: EstadoVacio): boolean;
  ganador(): void;
}

export default class RuleVacio implements Rule {
  //Verifica si la jugada es correcta
  acciones_validas(): AccionStrategy[] {
    return [
      RULES_VACIO["accumulation_check"],
      RULES_VACIO["choose_emotion"],
      RULES_VACIO["credit_card"],
      RULES_VACIO["double_draw_check"],
      RULES_VACIO["draw_card"],
      RULES_VACIO["end_game"],
      RULES_VACIO["end_round"],
      RULES_VACIO["hangover_card"],
      RULES_VACIO["pass_turn"],
      RULES_VACIO["play_card"],
      RULES_VACIO["reverse_turn"],
      RULES_VACIO["silence_card"],
      RULES_VACIO["start_game"],
      RULES_VACIO["temptation_card"],
      RULES_VACIO["therapy_card"],
    ];
  }

  // Cambia el turno con un booleano
  turno_siguiente(estado: EstadoVacio): void {
    if (estado.turno == 0) {
      estado.turno = 1;
    } else {
      estado.turno = 0;
    }
  }

  aplicar(estado: EstadoVacio, accion: AccionStrategy): void {
    //Aplicamos la estregia jugada
    accion.ejecutarAccion(estado);
  }

  ganador(): void {
    Swal.fire({
      title: "Custom width, padding, color, background.",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
    });
  }

  hay_ganador(estado: EstadoVacio): boolean {
    const turno_actual = estado.turno;

    return estado.jugadores[turno_actual].cartas.length - 1 == 0 ? true : false;
  }

  puede_cantar(estado: EstadoVacio): boolean {
    const turno_actual = estado.turno;
    if (estado.jugadores[turno_actual].cartas.length - 1 == 1) return true;
    return false;
  }
}
