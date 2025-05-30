import { REGLAS_VACIO } from "../constants/reglas";
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
      console.log(this.accion);
      //Turno del actual jugador
      /*  const turno = this.juego.estado.turno; */

      // Delega la logica de la jugada

      /* CAMBIO RECIENTE */
      if (this.juego.estado.acciones_utilizadas.length == 0) {
        this.juego.estado.puede_robar = true;
        this.juego.estado.puede_jugar_nuevamente = false;
        this.juego.estado.puede_pasar = false;
      }

      this.juego.reglas.aplicar(this.juego.estado, this.accion);

      // Verficiar cantidad de cartas para saber si puede decir VACIO!
      const puede_cantar = this.juego.reglas.puede_cantar(this.juego.estado);

      if (puede_cantar) {
        this.juego.estado.jugadores[this.juego.estado.turno].canto_vacio = true;
      }

      /* puede_cantar && this.juego.estado.acciones_utilizadas() */

      /* Verificar si hay ganador  */
      const hay_ganador = this.juego.reglas.hay_ganador(this.juego.estado);
      if (hay_ganador) {
        console.log(this.juego.estado.ganador);
        this.juego.estado.ganador =
          this.juego.estado.jugadores[this.juego.estado.turno];
        this.juego.estado.finalizado = true;
        return;
      }

      if (
        this.accion === REGLAS_VACIO["pasar_turno"] &&
        !this.juego.estado.puede_pasar
      ) {
        this.juego.estado.puede_robar = true;
        this.juego.estado.puede_jugar_nuevamente = false;
        this.juego.estado.puede_pasar = false;
        this.juego.reglas.turno_siguiente(this.juego.estado);
        this.juego.estado.acciones_utilizadas = [];
        return;
      } else if (!this.juego.estado.puede_jugar_nuevamente) {
        // Si el jugador NO no esta habilitado a jugar nuevamente reseteamos los valores y ademas lo hacemos pasar de turno
        // Eliminamos los movimientos realizados ya que el turno se completo
        this.juego.estado.acciones_utilizadas = [];

        // Pasamos el turno al siguiente jugador
        this.juego.reglas.turno_siguiente(this.juego.estado);
        this.juego.estado.puede_robar = true;
        this.juego.estado.puede_jugar_nuevamente = false;
        this.juego.estado.puede_pasar = false;
      } else {
        // Se agrega el movimiento realizado
        this.juego.estado.acciones_utilizadas.push(this.accion);
      }
    }
  }
}
