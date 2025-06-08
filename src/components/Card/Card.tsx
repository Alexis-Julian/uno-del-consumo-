import { FEELINGS_COLORS_VACIO } from "./constants";
import type { Props } from "./Card.types";

export default function Card({ ...props }: Props) {
  function HeaderCard() {
    const actionToSpanish = {
      reverse: "Reversa",
      silence: "Silencio",
      temptation: "Tentación",
    };

    if ("action" in props) {
      return <p className="uppercase">{actionToSpanish[props.action_name]}</p>;
    } else {
      return (
        <>
          <p className="uppercase">{props.feeling}</p>
          <p className="uppercase">{props.number}</p>
        </>
      );
    }
  }

  function MainCard() {
    if ("action" in props) {
      const stylesShared = "absolute h-full w-full bg-no-repeat bg-center";

      const elementCard = {
        silence: (
          <span
            className={`bg-[url('/src/assets/block.svg')] ${stylesShared}`}
          ></span>
        ),
        temptation: (
          <span
            className={`bg-[url('/src/assets/bag.svg')] ${stylesShared}`}
          ></span>
        ),
        reverse: (
          <span
            className={`bg-[url('/src/assets/reverse.svg')]  ${stylesShared}`}
          ></span>
        ),
      };

      return elementCard[props.action_name];
    } else {
      return <p className="font-black text-2xl">{props.comment}</p>;
    }
  }
  return (
    <div
      onClick={
        props.onCardaction ? () => props.onCardaction?.(props.id) : undefined
      }
      className={`${
        props.onCardaction && "cursor-pointer"
      } text-center  transition-all list-none p-[1px] m-3 border-2 h-[300px]  w-[200px]  bg-white  `}
    >
      <article
        className={`flex flex-col  h-full border-2 relative `}
        style={{
          backgroundColor: FEELINGS_COLORS_VACIO[props.feeling],
        }}
      >
        {/* Cabezera de la tarjeta */}
        <header className="z-10 flex text-2xl font-black text-white items-center justify-around  min-h-[40px] h-[20%] ">
          <HeaderCard />
        </header>

        {/* Cuerpo de la tarjeta */}
        <main className="z-10 h-[80%]  relative flex  items-center justify-center">
          <MainCard />

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
              color: FEELINGS_COLORS_VACIO[props.feeling],
            }}
          >
            <p className="uppercase">{props.feeling}</p>
          </div>
          {"number" in props && <p>{props.number}</p>}
        </footer>

        {/* background de la carta */}
        <div className="bg-[url('/src/assets/bg_grietas.png')] absolute  h-full w-full opacity-30 z-0"></div>
      </article>
    </div>
  );
}
