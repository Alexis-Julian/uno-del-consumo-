import type { AnyCard } from "./types/card";
import type { CommunCard, ActionCard } from "./domain/Carta";
export function esCartaComun(carta: unknown): carta is CommunCard {
  return (
    carta != null &&
    typeof carta === "object" &&
    "sentimiento" in carta &&
    "numero" in carta &&
    "mensaje" in carta
  );
}

export function esCartaAccion(carta: unknown): carta is ActionCard {
  return (
    carta != null &&
    typeof carta === "object" &&
    "sentimiento" in carta &&
    "mensaje" in carta &&
    "accion" in carta &&
    "nombre_accion" in carta
  );
}
export function esCartaComodin(carta: unknown): carta is CommunCard {
  return (
    carta != null &&
    typeof carta === "object" &&
    "sentimiento" in carta &&
    "numero" in carta &&
    "mensaje" in carta
  );
}

export class ValidadorDeCartas {
  static esCartaValida(
    carta: AnyCard | null,
    cartaEnJuego: AnyCard | null
  ): boolean {
    if (!carta || !cartaEnJuego) return false;

    switch (carta.type) {
      case "common":
        return (
          ("color" in carta &&
            "color" in cartaEnJuego &&
            carta.color === cartaEnJuego.color) ||
          ("number" in carta &&
            "number" in cartaEnJuego &&
            carta.number === cartaEnJuego.number) ||
          ("feeling" in carta &&
            "feeling" in cartaEnJuego &&
            carta.feeling === cartaEnJuego.feeling)
        );
      case "action":
        return (
          ("color" in carta &&
            "color" in cartaEnJuego &&
            carta.color === cartaEnJuego.color) ||
          ("feeling" in carta &&
            "feeling" in cartaEnJuego &&
            carta.feeling === cartaEnJuego.feeling)
        );
      default:
        return false;
    }
  }
}

export const reproducirSonido = (ruta: string) => {
  const audio = new Audio(ruta);
  audio.currentTime = 0;
  audio.play();
};

export const uuid = () =>
  Math.random().toString(36).substring(2, 10) + Date.now();
