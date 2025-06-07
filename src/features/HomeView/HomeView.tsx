import { LayoutGroup, motion } from "framer-motion";
import type JuegoVacio from "../../domain/Juego";
import GameTable from "../GameTable/GameTable";
import PlayerArea from "../PlayerArea/PlayerArea";
import { useState } from "react";
import ListCard from "../../components/ListCard/ListCard";

export default function HomeView({ useJuego }: { useJuego: JuegoVacio }) {
  const [useOpenTable, setOpenTable] = useState(false);

  const handleOpenTable = () => {
    setOpenTable(!useOpenTable);
  };

  return (
    <LayoutGroup id="home-view">
      <main className={` transition-all flex h-full w-full      `}>
        <motion.section
          role="complementary"
          aria-label="Player 1 Area"
          className="transition-all w-[40%] "
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
          className="transition-all w-[50%] m-2 border-2 border-white/50 rounded-sm  "
        >
          <GameTable useJugador={useJuego} />
        </motion.section>

        {/*  Renderizar la segunda area de jugador solo si useOpenTable es
        verdadero */}
        <motion.section
          className="max-w-[10%]  relative flex flex-col "
          role="complementary"
          aria-label="Player 2 Area"
        >
          <ListCard
            cards={useJuego.state.jugadores[1].cartas}
            back={true}
            scrollable={false}
            style={{
              gap: "1rem",
              padding: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div className="h-full w-full absolute z-50"></div>
        </motion.section>
      </main>
    </LayoutGroup>
  );
}
