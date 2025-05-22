import { SENTIMIENTOS_COLORES_VACIO } from "../const";

import type { NombreSentimientos } from "../const";

type Callback = (index: number | undefined) => void;
interface PropsCartaComun {
  sentimiento: string;
  numero: number;
  mensaje: string;
  callBack?: Callback;
  index?: number;
  isGame: boolean;
}

/* ${
          sentimiento == "EUFORIA"
            ? "border-[#B23758]"
            : sentimiento == "CALMA"
            ? "border-[#4fabff]"
            : sentimiento == "BRILLO"
            ? "border-black"
            : "border-b-amber-200"
        } */

export default function CartaComun({
  sentimiento,
  numero,
  mensaje,
  callBack,
  index,
  isGame,
}: PropsCartaComun) {
  /* console.log(isGame); */
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={callBack ? (_e) => callBack(index) : undefined}
      className={`${
        isGame ? "cursor-pointer" : "cursor-not-allowed"
      } text-center  transition-all list-none p-[1px] m-3 border-2 h-[300px]  w-[200px]  bg-white`}
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
          <p>{sentimiento}</p>
          <p>{numero}</p>
        </div>
        {/* Cuerpo de la tarjeta */}
        <div className="z-10 h-[80%]  relative flex  items-center justify-center">
          <p className="font-black text-2xl">{mensaje}</p>
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
          <p>{numero}</p>
        </div>
        {/* Footer de la tarjeta*/}
      </section>
    </button>
  );
}
