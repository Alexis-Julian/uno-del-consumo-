import type JuegoVacio from "../../domain/Juego";
import parteTraseraCarta from "../../assets/trasera.png";
import { RULES_VACIO } from "../../constants/reglas";
import Card from "../../components/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
interface TableroProp {
  useJugador: JuegoVacio;
}

export default function GameTable({ useJugador }: TableroProp) {
  const MazoDeCarta = () => {
    return (
      <div className="h-[294px] w-[194px] cursor-pointer relative border ">
        <button
          disabled={!useJugador.state.puede_robar}
          onClick={
            useJugador.state.turno == 0
              ? () => useJugador.jugar(RULES_VACIO["draw_card"])
              : undefined
          }
          className={`h-full w-full rounded-lg shadow-black shadow-sm    z-50  ${
            !useJugador.state.puede_robar
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <img
            src={parteTraseraCarta}
            className={`h-full w-full  ${
              useJugador.state.turno == 0 &&
              "hover:scale-105 hover:translate-x-[-32px] transition-all "
            }`}
          />
        </button>
        <img
          src={parteTraseraCarta}
          className="absolute top-0 h-full w-full rounded-lg shadow-black shadow-sm z-[-1]  "
        />
      </div>
    );
  };
  {
    /* <RenderizarCarta isGame={false} carta={useJugador.state.cartaActual} /> */
  }

  const LastCard = () => {
    return (
      <AnimatePresence mode="popLayout">
        <motion.div layoutId={String(useJugador.state.cartaActual?.id)}>
          <Card
            {...(useJugador.state.cartaActual as React.ComponentProps<
              typeof Card
            >)}
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="items-center justify-items-center grid grid-cols-2 relative shadow-inner shadow-black     bg-[#2a8156]   h-full w-full">
      <div className="z-10">
        <MazoDeCarta />
      </div>
      <div className="">
        <LastCard />
      </div>
      {/*   <div className="h-full w-full absolute bg-[url('/src/assets/bg_grietas.png')] bg-center opacity-50"></div> */}
      <div className=" h-[90%] rounded-4xl w-[90%] p-2 border-8 border-gray-50/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
    </div>
  );
}
