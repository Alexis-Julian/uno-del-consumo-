import type JuegoVacio from "../../domain/Juego";
import ListCard from "../../components/ListCard/ListCard";
import heartSvg from "../../assets/heart.svg";
import eye_open from "../../assets/eye_open.svg";
import eye_close from "../../assets/eye_close.svg";
import card_heart from "../../assets/card_heart.svg";
import logo_icon from "../../assets/logo.png";
import { RULES_VACIO } from "../../constants/reglas";

type Callback = () => void;

interface ManoJugadorProps {
  useJuego: JuegoVacio;
  id: number;
  handleOpenTable: Callback;
  handleMostrarVacio: Callback;
}

export default function PlayerArea({
  useJuego,
  id,
  handleOpenTable,
  handleMostrarVacio,
}: ManoJugadorProps) {
  /* const ButtonTranspartent = () => {
    <ul className="h-[100%] w-[30%] grid   items-center justify-items-center z-10">
      <li
        onClick={() => handleOpenTable()}
        className="h-[80px] w-[80px]  hover:scale-90 transition-all cursor-pointer relative"
      >
        <img src={eye_open} className="h-full w-full z-10" />
        <div className="bg-white/2 absolute h-full w-full top-0 z-[-1] rounded-md shadow-inner shadow-white/50 "></div>
      </li>
    </ul>;
  }; */

  /*   const cartas = useJuego.state.jugadores[id].cartas; */

  const cardAction = (index?: number) => {
    if (!index) return;
    console.log(index);
    useJuego.state.jugadores[useJuego.state.turno].seleccion_carta(index);

    useJuego.jugar(RULES_VACIO["play_card"]);
  };

  /* const jugar_carta = (index?: number) => {
      if (!index) return;
  
      useJuego.state.jugadores[useJuego.state.turno].seleccion_carta(index);
      useJuego.jugar(REGLAS_VACIO["jugar_carta"]);
    };
   */
  /* ${
          useJuego.state.turno == 0 && "box "
        } */

  const NavMenuYo = () => {
    /* console.log(
      useJuego.state.turno == 0 && useJuego.state.puede_jugar_nuevamente
    ); */
    return (
      <nav className="h-[10%] w-full z-10 relative flex overflow-hidden">
        {/* Es posible moduralizar aca */}
        <ul className="z-10 h-[100%] w-[100%]  flex items-center justify-center   gap-2  ">
          {/* SIMBOLO PARA VER LAS CARTAS DE LOS DEMAS JUGADORES */}
          <li
            /*    onClick={() => handleOpenTable()} */
            className={`h-[80px] w-[80px]  hover:scale-90 transition-all cursor-pointer relative flex items-center justify-center `}
          >
            <img
              src={eye_open}
              className=" h-[80%] w-[80%]  p-2 z-10 border-2 border-black/20 rounded-full"
            />
            <div
              className={` rounded-full border-red-500/40 border-8 absolute h-full w-full top-0 z-[-1]  shadow-inner    `}
            ></div>
          </li>
          {/* MICRO-COMPONENTE DE PASAR TURNO */}

          {/* Simbolo para pasar turno */}
          <li className="z-10 h-[80px] w-[80px]   transition-all cursor-pointer relative">
            <button
              disabled={
                useJuego.state.turno !== 0 || !useJuego.state.puede_pasar
              }
              onClick={() => useJuego.jugar(RULES_VACIO["pass_turn"])}
              className={`rounded text-center h-full w-full text-white text-2xl flex items-center justify-center  transition-all ${
                useJuego.state.puede_pasar
                  ? "cursor-pointer hover:scale-90"
                  : "cursor-not-allowed hover:scale-100"
              }`}
            >
              <img
                className="p-2  h-[80%] w-[80%] border-2 border-black/20 rounded-full "
                src={card_heart}
                alt=""
              />
            </button>
            <div
              className={`bg-white/2 absolute h-full w-full top-0 z-[-1] rounded-full shadow-inner   ${
                useJuego.state.puede_pasar
                  ? "shadow-red-700 "
                  : "shadow-green-700"
              }`}
            >
              <div
                className={`bg-white/2 h-full w-full  rounded-full  border-8 ${
                  useJuego.state.turno !== 0 || !useJuego.state.puede_pasar
                    ? "border-red-500/40 "
                    : "border-green-500/40"
                }`}
              ></div>
            </div>
          </li>
          {/* SIMBOLO PARA CANTAR VACIO! */}
          <li className="z-10 h-[80px] w-[80px]   transition-all  relative">
            <button
              disabled={!useJuego.state.jugadores[0].canto_vacio}
              onClick={
                useJuego.state.jugadores[0].canto_vacio
                  ? handleMostrarVacio
                  : undefined
              }
              className={`rounded text-center h-full w-full text-white text-2xl transition-all ${
                !(
                  useJuego.state.turno == 0 &&
                  useJuego.state.jugadores[0].canto_vacio
                )
                  ? " shadow-red-700   cursor-not-allowed hover:  "
                  : "shadow-green-700 hover:scale-100 cursor-pointer"
              }`}
            >
              <img className="p-2" src={logo_icon} alt="" />
            </button>
            <div
              className={`bg-white/2 absolute h-full w-full top-0 z-[-1] rounded-full shadow-inner  shadow-white/50`}
            >
              <div
                className={`h-full w-full  rounded-full border-8 ${
                  !(
                    useJuego.state.turno == 0 &&
                    useJuego.state.jugadores[0].canto_vacio
                  )
                    ? "border-red-500/40 "
                    : "border-green-500/40"
                } `}
              ></div>
            </div>
          </li>
        </ul>
        <div className="h-full w-full absolute top-0 blur-sm bg-white/10  border-b-2 border-red-700/50"></div>
      </nav>
    );
  };

  const NavMenuRobot = () => {
    return (
      <ul className="h-[10%] w-[100%]  grid   items-center justify-items-center z-10">
        <li
          onClick={() => handleOpenTable()}
          className="h-[80px] w-[80px]   hover:scale-90 transition-all cursor-pointer relative "
        >
          <img src={eye_close} className="h-full w-full z-10 p-2" />
          <div className="bg-white/2 absolute h-full w-full top-0 z-[-1] rounded-full shadow-inner shadow-white/50 "></div>
        </li>
      </ul>
    );
  };

  return (
    <aside className={`h-full w-[40%] relative  shadow-lg shadow-black p-2 `}>
      <div className="relative bg-[#290404]   bg- h-full w-full rounded-md  shadow-sm border-2 border-gray-500/50 shadow-black   flex flex-col">
        {/* {id == 0 ? (
        ) : (
          <NavMenuRobot />
          )} */}
        <NavMenuYo />

        <ListCard
          cards={useJuego.state.jugadores[0].cartas}
          onCardaction={cardAction}
          isPlayer={true}
        />

        <div className="h-full w-full absolute  bg-[url('/src/assets/bg_grietas.png')] bg-center   opacity-20"></div>
        <img
          src={heartSvg}
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 "
        />
      </div>
    </aside>
  );
}
