import type { CartaAccion, CartaComun, CartaComodin } from "./Carta";

export default class Jugador {
  nombre: string;
  puntos: number;
  cartas: (CartaComun | CartaAccion | CartaComodin | null)[];
  carta_activa: CartaAccion | CartaComun | CartaComodin | null;
  canto_vacio: boolean;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.puntos = 0;
    this.cartas = [null];
    this.carta_activa = null;
    this.canto_vacio = false;
  }

  mostrar_cartas() {
    const cartas = [];
    if (this.cartas.length > 0) {
      for (let index = 0; index < this.cartas.length; index++) {
        cartas.push([index, this.cartas[index]]);
      }
    }
  }
  seleccion_carta(numero: number) {
    this.carta_activa = this.cartas[numero];
  }
}
