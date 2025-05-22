import { SENTIMIENTOS_COLORES_VACIO } from "../const";

import type { NombreSentimientos } from "../const";
import type { AccionStrategy } from "../domain/AccionStrategy";
import type { NombreAccion } from "../domain/Carta";

type Callback = (index: number | undefined) => void;

interface PropsCartaAccion {
  sentimiento: string;
  mensaje?: string;
  nombre_accion: NombreAccion;
  accion?: AccionStrategy;
  index?: number;
  callBack?: Callback;
  isGame?: boolean;
}

export default function CartaAccion({
  sentimiento,
  nombre_accion,
  index,
  callBack,
  isGame = false,
}: PropsCartaAccion) {
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={callBack ? (_e) => callBack(index) : undefined}
      disabled={false}
      className={` text-center  transition-all list-none p-[1px] m-3 border-2 h-[300px]  w-[200px]   bg-white ${
        isGame ? "cursor-pointer" : "cursor-not-allowed"
      }`}
    >
      <section
        className={`flex flex-col  h-full border-2 relative `}
        style={{
          backgroundColor:
            SENTIMIENTOS_COLORES_VACIO[sentimiento as NombreSentimientos],
        }}
      >
        {/* background de la carta */}
        <div className="bg-[url('/src/assets/bg_grietas.png')] absolute  h-full w-full opacity-30 z-0"></div>

        {/* Cabezera de la tarjeta */}
        <div className="z-10 flex text-2xl font-black text-white items-center justify-around  min-h-[40px] h-[20%] ">
          <p>{nombre_accion}</p>
        </div>
        {/* Cuerpo de la tarjeta */}
        <div className="z-10 h-[80%]  relative flex  items-center justify-center">
          {nombre_accion == "SILENCIO" ? (
            <span className="bg-[url('/src/assets/block.svg')] absolute h-full w-full bg-no-repeat bg-center"></span>
          ) : nombre_accion == "TENTACION" ? (
            <span className="bg-[url('/src/assets/bag.svg')] absolute h-full w-full bg-no-repeat bg-center"></span>
          ) : (
            <span className="bg-[url('/src/assets/reverse.svg')] absolute h-full w-full bg-no-repeat bg-bottom-right"></span>
          )}
          <span
            className={`bg-[url('/src/assets/ovalo.svg')] w-[188px] h-[273px] bg-no-repeat bg-center bg-contain  rotate  absolute     `}
          ></span>
        </div>
        <div className="z-10  flex text-2xl font-black text-white justify-between px-2  min-h-[40px] h-[20%] items-center">
          <div
            className="bg-white w-[120px] justify-center h-[35px]  text-md  flex items-center "
            style={{
              color:
                SENTIMIENTOS_COLORES_VACIO[sentimiento as NombreSentimientos],
            }}
          >
            <p>{sentimiento}</p>
          </div>
        </div>
        {/* Footer de la tarjeta*/}
      </section>
    </button>
  );
}
