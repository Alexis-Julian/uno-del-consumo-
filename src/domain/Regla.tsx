import EstadoVacio from "./Estado";
import type { AccionStrategy } from "./AccionStrategy";

import { REGLAS_VACIO } from "../const";
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
      REGLAS_VACIO["carta1"],
      REGLAS_VACIO["carta2"],
      REGLAS_VACIO["carta3"],
      REGLAS_VACIO["carta4"],
      REGLAS_VACIO["carta5"],
      REGLAS_VACIO["carta6"],
      REGLAS_VACIO["carta7"],
      REGLAS_VACIO["fin_juego"],
      REGLAS_VACIO["fin_ronda"],
      REGLAS_VACIO["iniciar_juego"],
      REGLAS_VACIO["robar_carta"],
      REGLAS_VACIO["pasar_turno"],
      REGLAS_VACIO["validacion"],
      REGLAS_VACIO["jugar_carta"],
      REGLAS_VACIO["validacion_micro"],
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
