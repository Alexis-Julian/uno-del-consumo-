import CartaAccion from "./CartaAccion";
import CartaComun from "./CartaComun";

import { esCartaAccion, esCartaComun } from "../helpers";
import type { AccionStrategy } from "../domain/AccionStrategy";

interface PropsCartaComun {
  sentimiento: string;
  numero: number;
  mensaje: string;
}

interface PropsCartaAccion {
  sentimiento: string;
  mensaje: string;
  nombre_accion: string;
  accion: AccionStrategy;
}

interface PropsCartaComodin {
  accion: AccionStrategy;
}
type Carta = PropsCartaAccion | PropsCartaComodin | PropsCartaComun | null;
type Callback = (index: number | undefined) => void;

export default function RenderizarCarta({
  carta,
  callBack,
  index,
  isGame = false,
}: {
  carta: Carta;
  callBack?: Callback;
  index?: number;
  isGame?: boolean;
}) {
  return esCartaAccion(carta) ? (
    <CartaAccion
      isGame={isGame}
      key={index}
      index={index}
      {...carta}
      callBack={callBack}
    />
  ) : (
    esCartaComun(carta) && (
      <CartaComun
        isGame={isGame}
        key={index}
        index={index}
        {...carta}
        callBack={callBack}
      />
    )
  );
}
