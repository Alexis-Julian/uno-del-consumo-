import { type CardProps } from "./Card.types";
import {
  SENTIMIENTOS_COLORES_VACIO,
  type NombreSentimientos,
} from "./constants";

export default function Card({
  mensaje,
  sentimiento,
  numero,
  nombre_accion,
}: CardProps) {
  return (
    <div
      className={`text-center  transition-all list-none p-[1px] m-3 border-2 h-[300px]  w-[200px]  bg-white`}
    >
      <article
        className={`flex flex-col  h-full border-2 relative `}
        style={{
          backgroundColor:
            SENTIMIENTOS_COLORES_VACIO[sentimiento as NombreSentimientos],
        }}
      >
        {/* Cabezera de la tarjeta */}
        <header className="z-10 flex text-2xl font-black text-white items-center justify-around  min-h-[40px] h-[20%] ">
          {!nombre_accion && <p>{sentimiento}</p>}
          {!nombre_accion && <p>{numero}</p>}
          {nombre_accion && <p>{nombre_accion}</p>}
        </header>

        {/* Cuerpo de la tarjeta */}
        <main className="z-10 h-[80%]  relative flex  items-center justify-center">
          {!nombre_accion && <p className="font-black text-2xl">{mensaje}</p>}

          {/* Solamente se ejecuta cuando viene una carta de accion */}
          {nombre_accion && nombre_accion == "SILENCIO" ? (
            <span className="bg-[url('/src/assets/block.svg')] absolute h-full w-full bg-no-repeat bg-center"></span>
          ) : nombre_accion == "TENTACION" ? (
            <span className="bg-[url('/src/assets/bag.svg')] absolute h-full w-full bg-no-repeat bg-center"></span>
          ) : (
            nombre_accion == "REVERSA" && (
              <span className="bg-[url('/src/assets/reverse.svg')] absolute h-full w-full bg-no-repeat bg-bottom-right"></span>
            )
          )}

          {/* Ovalo decorativo  */}
          <span
            aria-hidden="true"
            className={`bg-[url('/src/assets/ovalo.svg')] w-[188px] h-[273px] bg-no-repeat bg-center bg-contain  rotate  absolute     `}
          ></span>
        </main>

        {/* Footer de la tarjeta*/}
        <footer className="z-10  flex text-2xl font-black text-white justify-between px-2  min-h-[40px] h-[20%] items-center">
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
        </footer>

        {/* background de la carta */}
        <div className="bg-[url('/src/assets/bg_grietas.png')] absolute  h-full w-full opacity-30 z-0"></div>
      </article>
    </div>
  );
}
