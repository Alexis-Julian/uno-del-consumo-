import { RULES_VACIO } from "../constants/reglas";
import { type AccionStrategy } from "./AccionStrategy";
import JuegoVacio from "./Juego";
export default class AccionComando {
  juego: JuegoVacio;
  accion: AccionStrategy;

  constructor(juego: JuegoVacio, accion: AccionStrategy) {
    this.juego = juego;
    this.accion = accion;
  }
  execute() {
    if (this.juego.reglas.acciones_validas().includes(this.accion)) {
      //Turno del actual jugador
      /*  const turno = this.juego.state.turno; */

      // Delega la logica de la jugada
      console.log(this.accion);
      /* CAMBIO RECIENTE */
      if (this.juego.state.acciones_utilizadas.length == 0) {
        this.juego.state.puede_robar = true;
        this.juego.state.puede_jugar_nuevamente = false;
        this.juego.state.puede_pasar = false;
      }

      this.juego.reglas.aplicar(this.juego.state, this.accion);

      // Verficiar cantidad de cartas para saber si puede decir VACIO!
      const puede_cantar = this.juego.reglas.puede_cantar(this.juego.state);

      if (puede_cantar) {
        this.juego.state.jugadores[this.juego.state.turno].canto_vacio = true;
      }

      /* puede_cantar && this.juego.state.acciones_utilizadas() */

      /* Verificar si hay ganador  */
      const hay_ganador = this.juego.reglas.hay_ganador(this.juego.state);
      if (hay_ganador) {
        console.log(this.juego.state.ganador);
        this.juego.state.ganador =
          this.juego.state.jugadores[this.juego.state.turno];
        this.juego.state.finalizado = true;
        return;
      }

      if (
        this.accion === RULES_VACIO["pass_turn"] &&
        !this.juego.state.puede_pasar
      ) {
        this.juego.state.puede_robar = true;
        this.juego.state.puede_jugar_nuevamente = false;
        this.juego.state.puede_pasar = false;
        this.juego.reglas.turno_siguiente(this.juego.state);
        this.juego.state.acciones_utilizadas = [];
        return;
      } else if (!this.juego.state.puede_jugar_nuevamente) {
        // Si el jugador NO no esta habilitado a jugar nuevamente reseteamos los valores y ademas lo hacemos pasar de turno
        // Eliminamos los movimientos realizados ya que el turno se completo
        this.juego.state.acciones_utilizadas = [];

        // Pasamos el turno al siguiente jugador
        this.juego.reglas.turno_siguiente(this.juego.state);
        this.juego.state.puede_robar = true;
        this.juego.state.puede_jugar_nuevamente = false;
        this.juego.state.puede_pasar = false;
      } else {
        // Se agrega el movimiento realizado
        this.juego.state.acciones_utilizadas.push(this.accion);
      }
    }
  }
}
