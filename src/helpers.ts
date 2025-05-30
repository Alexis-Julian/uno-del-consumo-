import { CreditoStrategy } from "./domain/AccionStrategy";
import type { CartaAccion, CartaComun } from "./domain/Carta";
import type { CualquierCarta } from "./domain/Carta";

export function esCartaComun(carta: unknown): carta is CartaComun {
  return (
    carta != null &&
    typeof carta === "object" &&
    "sentimiento" in carta &&
    "numero" in carta &&
    "mensaje" in carta
  );
}

export function esCartaAccion(carta: unknown): carta is CartaAccion {
  return (
    carta != null &&
    typeof carta === "object" &&
    "sentimiento" in carta &&
    "mensaje" in carta &&
    "accion" in carta &&
    "nombre_accion" in carta
  );
}
export function esCartaComodin(carta: unknown): carta is CartaComun {
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
    carta: CualquierCarta | null,
    cartaEnJuego: CualquierCarta | null
  ): boolean {
    if (!carta || !cartaEnJuego) return false;

    switch (carta.tipo) {
      case "comun":
        return (
          ("color" in carta &&
            "color" in cartaEnJuego &&
            carta.color === cartaEnJuego.color) ||
          ("numero" in carta &&
            "numero" in cartaEnJuego &&
            carta.numero === cartaEnJuego.numero) ||
          ("sentimiento" in carta &&
            "sentimiento" in cartaEnJuego &&
            carta.sentimiento === cartaEnJuego.sentimiento)
        );
      case "accion":
        return (
          ("color" in carta &&
            "color" in cartaEnJuego &&
            carta.color === cartaEnJuego.color) ||
          ("sentimiento" in carta &&
            "sentimiento" in cartaEnJuego &&
            carta.sentimiento === cartaEnJuego.sentimiento)
        );
      case "comodin":
        return "accion" in carta && carta.accion instanceof CreditoStrategy;
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
/* import { motion, AnimatePresence } from "framer-motion";

type Props = {
  mostrar: boolean;
};

export default function MiComponente({ mostrar }: Props) {
  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 bg-white rounded shadow">
            Soy un componente animado 🪄
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} */
/* Propiedad	Significado
initial	Cómo entra (desde opacidad 0 y y = 20)
animate	Cómo debe lucir una vez montado
exit	Cómo debe desaparecer
transition	Duración y suavidad
AnimatePresence	Permite animar cuando el componente se va (unmount) */
export const uuid = () =>
  Math.random().toString(36).substring(2, 10) + Date.now();
