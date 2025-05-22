import { useState, useEffect } from "react";
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";
import JuegoVacio from "./domain/Juego";
import EstadoVacio from "./domain/Estado";
import ReglasVacio from "./domain/Regla";
import { REGLAS_VACIO } from "./const";
import vacioPng from "../src/assets/Vacio.png";
import logoPng from "../src/assets/logo.png";
import Mesa from "./components/Mesa";
import TableroPersonal from "./components/TableroPersonal";
import { motion, AnimatePresence } from "framer-motion";
import jugarTurnoRobot from "./robot";

import LogoVacio from "./components/LogoVacio";
const esperar = (ms: number) => new Promise((res) => setTimeout(res, ms));
function App() {
  const [useEstado, setEstado] = useState<EstadoVacio>(new EstadoVacio());
  const [useJuego, setJuego] = useState<JuegoVacio>(
    new JuegoVacio(new ReglasVacio(), useEstado, setEstado)
  );
  const [PresentacionActiva, setPresentacionActiva] = useState(true);
  const [useCloseLogo, setCloseLogo] = useState(false);
  useEffect(() => {
    const ejecutarTurno = async () => {
      await jugarTurnoRobot({ useJuego });
    };

    ejecutarTurno();
  }, [useJuego.estado.turno]);

  useEffect(() => {
    useJuego.jugar(REGLAS_VACIO["iniciar_juego"]);
    useJuego.jugar(REGLAS_VACIO["jugar_carta"]);
  }, [useJuego]);

  async function handleMostrarVacio() {
    const nuevo_bool = !useCloseLogo;
    setCloseLogo(nuevo_bool);

    await esperar(1000);
    const segundo_bool = !nuevo_bool;
    setCloseLogo(segundo_bool);
  }
  /* const ver_todas_las_cartas = () => {
    return useJuego.estado.baraja.cards.map((e, index) => {
      if (esCartaComun(e)) {
        return (
          <CartaComun
            numero={e.numero}
            sentimiento={e.sentimiento}
            mensaje={e.mensaje}
            index={index}
          />
        );
      }
    });
  }; */

  const [useOpenTable, setOpenTable] = useState(false);

  const handleOpenTable = () => {
    setOpenTable(!useOpenTable);
  };

  return (
    <body className="overflow-hidden relative">
      {/* <AnimatePresence>
        {PresentacionActiva && (
          <motion.div
            onClick={handlePresentacion}
            className=" cursor-pointer absolute top-0 z-50 h-full w-full flex items-center justify-center bg-[#c73718]/50 backdrop-blur-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <img className="h-full blur-mask animate-jump-in " src={vacioPng} />
          </motion.div>
        )}
      </AnimatePresence>
 */}
      {/* Presentacion del logo vacio cuando un jugador canta */}
      {
        <AnimatePresence>
          {useCloseLogo && (
            <motion.div
              className={`$ absolute top-0 z-50 h-full w-full flex items-center justify-center animate-rotate-x `}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="h-[80%]  cursor-pointer "
                src={logoPng}
                alt="Logo"
              />
            </motion.div>
          )}
        </AnimatePresence>
      }
      {/* Desarrollo de la section y el contenido */}
      <section className="flex h-full w-full relative overflow-hidden">
        <div className="absolute h-full w-full  bg-[url('/src/assets/bg_asfalto.png')] bg-contain bg-center bg-no-repeat "></div>
        <div className="absolute h-full w-full bg-[#c23113]/20  "></div>
        <TableroPersonal
          useJuego={useJuego}
          id={0}
          handleOpenTable={handleOpenTable}
          handleMostrarVacio={handleMostrarVacio}
        />
        <AnimatePresence>
          {useOpenTable && (
            <motion.div
              /*  onClick={handlePresentacion} */
              className="absolute z-50 w-full h-full "
              initial={{ opacity: 0, x: -300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 0.95 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TableroPersonal
                useJuego={useJuego}
                id={1}
                handleOpenTable={handleOpenTable}
                handleMostrarVacio={handleMostrarVacio}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seccion donde los jugadores juegan se ven las cartas en mesa las cartas usadas y los jugadores en mesa */}
        <section className="p-8 relative w-[60%] flex flex-col  items-center justify-around  ">
          <aside className="h-[80%] bg-[#8a582b] p-4 w-[100%] z-10 rounded-sm relative overflow-hidden">
            <Mesa useJugador={useJuego} />
            <div className="h-full w-full absolute top-0 left-0 bg-[url('/src/assets/bg_grietas.png')] bg-cover bg-no-repeat bg-center  opacity-50"></div>
          </aside>
        </section>
        {/* Zona de la ia */}
        {/*  <aside className="h-full w-full  flex  flex-wrap gap-2 overflow-scroll  justify-center">
          {ver_todas_las_cartas()}
        </aside> */}
      </section>
    </body>
  );
}

export default App;
