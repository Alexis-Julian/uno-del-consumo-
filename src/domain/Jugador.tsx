import type { AnyCard } from "../types/card";

export default class Jugador {
  nombre: string;
  puntos: number;
  cartas: AnyCard[];
  carta_activa: AnyCard | null;
  canto_vacio: boolean;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.puntos = 0;
    this.cartas = [];
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
