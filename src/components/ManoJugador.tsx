import { REGLAS_VACIO } from "../const";
import type JuegoVacio from "../domain/Juego";

import RenderizarCarta from "./RenderizarCarta";

/* type Props = {
  nombre: string;
  puntos: number;
  cartas: (CartaComun | CartaAccion | CartaComodin | null)[];
  acciones_utilizadas: AccionStrategy[];
  carta_activa: CartaComun | CartaAccion | CartaComodin | null;
} */ /* ;useJuego.estado.jugadores[useJuego.estado.turno].seleccion_carta(2); */
interface ManoJugadorProps {
  useJuego: JuegoVacio;
  id: number;
}

export default function ManoJugador({ useJuego, id }: ManoJugadorProps) {
  /* function jugar_carta(index: number) {
    useJuego.estado.jugadores[useJuego.estado.turno].seleccion_carta(index);
    useJuego.jugar(REGLAS_VACIO["jugar_carta"]);
  } */
  const cartas = useJuego.estado.jugadores[id].cartas;

  {
    /* <div className="z-10" onClick={() => jugar_carta(index)}>
          </div> */
  }
  const jugar_carta = (index?: number) => {
    if (!index) return;

    useJuego.estado.jugadores[useJuego.estado.turno].seleccion_carta(index);
    useJuego.jugar(REGLAS_VACIO["jugar_carta"]);
  };

  return (
    <ul
      className={`h-[90%] w-full z-10 grid grid-cols-3 overflow-scroll relative overflow-x-hidden transition-all ${
        useJuego.estado.turno == 0 && "box "
      } `}
    >
      {cartas.map((e, index) => {
        return (
          <RenderizarCarta
            key={index}
            index={index}
            carta={e}
            isGame={true}
            callBack={id == 0 ? jugar_carta : undefined}
          />
        );
      })}
    </ul>
  );
}
