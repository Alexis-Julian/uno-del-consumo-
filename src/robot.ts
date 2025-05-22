import { REGLAS_VACIO } from "./const";
import type { CualquierCarta } from "./domain/Carta";
import type JuegoVacio from "./domain/Juego";
import { ValidadorDeCartas } from "./helpers";

const esperar = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function jugarTurnoRobot({
  useJuego,
}: {
  useJuego: JuegoVacio;
}) {
  // Asegurarse de que sea su turno
  if (useJuego.estado.turno !== 1) return;

  // Intentar hasta que no pueda jugar más
  while (useJuego.estado.turno === 1) {
    const cartas = useJuego.estado.jugadores[1].cartas;
    const cartaValida = cartas.find((carta: CualquierCarta | null) =>
      ValidadorDeCartas.esCartaValida(carta, useJuego.estado.cartaActual)
    );

    if (cartaValida) {
      await esperar(800);

      useJuego.estado.jugadores[1].carta_activa = cartaValida;
      useJuego.jugar(REGLAS_VACIO["jugar_carta"]);

      await esperar(500);

      // Si no puede jugar de nuevo rompe el bucle para el siguiente jugador nomas
      if (!useJuego.estado.puede_jugar_nuevamente) break;

      // Si puede jugar nuevamente vuelve a empezar el bucle
      continue;
    }

    // Si no tenía carta válida, verifica si puede robar
    const yaRobo = useJuego.estado.acciones_utilizadas.includes(
      REGLAS_VACIO["robar_carta"]
    );

    if (!yaRobo) {
      useJuego.jugar(REGLAS_VACIO["robar_carta"]);
      await esperar(1000);

      const nuevasCartas = useJuego.estado.jugadores[1].cartas;
      const cartaNueva = nuevasCartas.find((carta: CualquierCarta | null) =>
        ValidadorDeCartas.esCartaValida(carta, useJuego.estado.cartaActual)
      );

      if (cartaNueva) {
        useJuego.estado.jugadores[1].carta_activa = cartaNueva;
        useJuego.jugar(REGLAS_VACIO["jugar_carta"]);

        await esperar(500);

        if (!useJuego.estado.puede_jugar_nuevamente) break;
        continue;
      } else {
        await esperar(500);
        useJuego.jugar(REGLAS_VACIO["pasar_turno"]);
        break;
      }
    } else {
      await esperar(500);
      useJuego.jugar(REGLAS_VACIO["pasar_turno"]);
      break;
    }
  }
}
