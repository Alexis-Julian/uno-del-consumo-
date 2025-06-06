import { RULES_VACIO } from "./constants/reglas";
import type { AnyCard } from "./types/card";
import type JuegoVacio from "./domain/Juego";
import { ValidadorDeCartas } from "./helpers";

const esperar = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function jugarTurnoRobot({
  useJuego,
}: {
  useJuego: JuegoVacio;
}) {
  // Asegurarse de que sea su turno
  if (useJuego.state.turno !== 1) return;

  // Intentar hasta que no pueda jugar más
  while (useJuego.state.turno === 1) {
    const cartas = useJuego.state.jugadores[1].cartas;
    const cartaValida = cartas.find((carta: AnyCard | null) =>
      ValidadorDeCartas.esCartaValida(carta, useJuego.state.cartaActual)
    );

    if (cartaValida) {
      await esperar(800);

      useJuego.state.jugadores[1].carta_activa = cartaValida;
      useJuego.jugar(RULES_VACIO["play_card"]);

      await esperar(500);

      // Si no puede jugar de nuevo rompe el bucle para el siguiente jugador nomas
      if (!useJuego.state.puede_jugar_nuevamente) break;

      // Si puede jugar nuevamente vuelve a empezar el bucle
      continue;
    }

    // Si no tenía carta válida, verifica si puede robar
    const yaRobo = useJuego.state.acciones_utilizadas.includes(
      RULES_VACIO["draw_card"]
    );

    if (!yaRobo) {
      useJuego.jugar(RULES_VACIO["draw_card"]);
      await esperar(1000);

      const nuevasCartas = useJuego.state.jugadores[1].cartas;
      const cartaNueva = nuevasCartas.find((carta: AnyCard | null) =>
        ValidadorDeCartas.esCartaValida(carta, useJuego.state.cartaActual)
      );

      if (cartaNueva) {
        useJuego.state.jugadores[1].carta_activa = cartaNueva;
        useJuego.jugar(RULES_VACIO["play_card"]);

        await esperar(500);

        if (!useJuego.state.puede_jugar_nuevamente) break;
        continue;
      } else {
        await esperar(500);
        useJuego.jugar(RULES_VACIO["pass_turn"]);
        break;
      }
    } else {
      await esperar(500);
      useJuego.jugar(RULES_VACIO["pass_turn"]);
      break;
    }
  }
}
