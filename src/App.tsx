import { useState, useEffect } from "react";
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";
import JuegoVacio from "./domain/Juego";
import stateVacio from "./domain/State";
import ReglasVacio from "./domain/Regla";
import { RULES_VACIO } from "./constants/reglas";
//import vacioPng from "../src/assets/Vacio.png";
/* import logoPng from "../src/assets/logo.png"; */
/* import imagePerdedora from "../src/assets/imagen_perdedora.png"; */

import { motion, AnimatePresence } from "framer-motion";
import jugarTurnoRobot from "./robot";
import HomeView from "./features/HomeView/HomeView";
/* import AlertaJuego from "./libraries/swal"; */
//import LogoVacio from "./components/LogoVacio";
/* const esperar = (ms: number) => new Promise((res) => setTimeout(res, ms)); */
function App() {
  const [usestate, setstate] = useState<stateVacio>(new stateVacio());
  const [useJuego] = useState<JuegoVacio>(
    new JuegoVacio(new ReglasVacio(), usestate, setstate)
  );
  // const [PresentacionActiva, setPresentacionActiva] = useState(true);
  /*  const [useCloseLogo, setCloseLogo] = useState(false); */

  // state que muestra el cartel ganador

  /* Efecto para darla interactividad a la IA */
  useEffect(() => {
    const ejecutarTurno = async () => {
      await jugarTurnoRobot({ useJuego });
    };

    if (!useJuego.state.finalizado) {
      ejecutarTurno();
    }
  }, [useJuego, useJuego.state.turno]);

  /* Efecto para iniciar una partida  */
  useEffect(() => {
    useJuego.jugar(RULES_VACIO["start_game"]);

    /*     useJuego.jugar(RULES_VACIO["play_card"]);
     */
  }, [useJuego]);

  /* async function handleMostrarVacio() {
    const nuevo_bool = !useCloseLogo;
    setCloseLogo(nuevo_bool);

    await esperar(1000);
    const segundo_bool = !nuevo_bool;
    setCloseLogo(segundo_bool);
  } */

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

      {/* Pantallaso final cuando hay algun ganador */}
      <AnimatePresence>
        {useJuego.state.finalizado &&
          useJuego.state.ganador?.nombre === "CPU" && (
            <motion.div
              key="ganador"
              className="h-full w-full absolute  z-50 bg-[url('/src/assets/bg_asfalto.png')] bg-[#e5cb98]"
              initial={{ opacity: 0, y: -1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -1000 }}
            >
              <div className="h-full w-full bg-[url('/src/assets/imagen_perdedora.png')] bg-contain bg-no-repeat"></div>
            </motion.div>
          )}
        )
        {useJuego.state.finalizado &&
          useJuego.state.ganador?.nombre !== "CPU" && (
            <motion.div
              key="perdedor"
              className="h-full w-full    gradiente_naranja_negro absolute  z-50   grid grid-cols-2 "
              initial={{ opacity: 0, y: -1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
            >
              <div className="h-full w-full bg-[url('/src/assets/bg_asfalto.png')] bg-center  absolute "></div>
              <div className="h-full w-full bg-[url('/src/assets/imagen_ganadora.png')] bg-left bg-contain bg-no-repeat"></div>
              <div className="h-full w-full bg-[url('/src/assets/imagen_ganadora2.png')] bg-right bg-contain bg-no-repeat"></div>
            </motion.div>
          )}
      </AnimatePresence>
      {/* Presentacion del logo vacio cuando un jugador canta */}
      {/*  <AnimatePresence>
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
        </AnimatePresence> */}

      {<HomeView useJuego={useJuego} />}
    </body>
  );
}

export default App;
