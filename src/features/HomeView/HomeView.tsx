import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type JuegoVacio from "../../domain/Juego";
import GameTable from "../GameTable/GameTable";
import PlayerArea from "../PlayerArea/PlayerArea";
import { useState } from "react";

export default function HomeView({ useJuego }: { useJuego: JuegoVacio }) {
  const [useOpenTable, setOpenTable] = useState(false);

  const handleOpenTable = () => {
    setOpenTable(!useOpenTable);
  };

  return (
    <LayoutGroup id="home-view">
      <main
        className={` transition-all flex h-full w-full 
      `}
      >
        <motion.section
          role="complementary"
          aria-label="Player 1 Area"
          className="transition-all w-[30%] "
        >
          {/* Renderizar la primera area del jugador fisico */}
          <PlayerArea
            useJuego={useJuego}
            id={0}
            handleOpenTable={handleOpenTable}
          />
        </motion.section>

        {/* Tablero donde se juegan las cartas y esta el mazo */}
        <motion.section
          role="main"
          aria-label="Game Table"
          className="transition-all w-[50%] "
        >
          <GameTable useJugador={useJuego} />
        </motion.section>

        <AnimatePresence>
          {/*  Renderizar la segunda area de jugador solo si useOpenTable es
        verdadero */}
          <motion.section
            className="w-[20%]"
            role="complementary"
            aria-label="Player 2 Area"
          >
            {
              <PlayerArea
                useJuego={useJuego}
                id={1}
                handleOpenTable={handleOpenTable}
              />
            }
          </motion.section>
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}
