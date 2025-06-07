import type JuegoVacio from "../../domain/Juego";
import ListCard from "../../components/ListCard/ListCard";
import heartSvg from "../../assets/heart.svg";
import card_heart from "../../assets/card_heart.svg";
import logo_icon from "../../assets/logo.png";
import { RULES_VACIO } from "../../constants/reglas";

type Callback = () => void;

interface ManoJugadorProps {
  useJuego: JuegoVacio;
  id: number;
  handleOpenTable: Callback;
  handleMostrarVacio?: Callback;
}

export default function PlayerArea({ useJuego, id }: ManoJugadorProps) {
  const cardAction = (index?: number) => {
    if (!index) return;
    console.log(index);
    useJuego.state.jugadores[useJuego.state.turno].seleccion_carta(index);

    useJuego.jugar(RULES_VACIO["play_card"]);
  };

  const NavBar = () => {
    // Componente de navegacion
    const NavItem = ({
      onAction,
      content,
    }: {
      onAction: Callback;
      content: string;
    }) => {
      return (
        <li className="h-[100%] w-[100%] flex items-center justify-center">
          <button
            onClick={onAction}
            disabled={useJuego.state.turno !== 0}
            className={`flex items-center justify-center border-white/50 border-2 p-2 px-4 rounded-full ${
              useJuego.state.turno !== 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}
          >
            <p className=" font-extralight text-lg">{content}</p>
          </button>
        </li>
      );
    };

    const items = {
      card_heart: {
        img: logo_icon,
        action: () => {},
        content: "Cantar Vacio",
      },
      logo_icon: {
        img: card_heart,
        action: () => {
          useJuego.jugar(RULES_VACIO["pass_turn"]);
        },
        content: "Pasar turno",
      },
    };

    return (
      <nav className="h-[10%] w-full z-10 relative flex overflow-hidden">
        {/* Es posible moduralizar aca */}
        <ul className="z-10 h-[100%] w-[100%]  grid grid-cols-2 gap-2 relative place-items-center place-content-center">
          {Object.entries(items).map(([key, value]) => (
            <NavItem
              key={key}
              onAction={value.action}
              content={value.content}
            />
          ))}
        </ul>
        <div className="h-full w-full absolute top-0 blur-sm bg-white/10  border-b-2 border-red-700/50"></div>
      </nav>
    );
  };

  return (
    <aside className={`h-full w-full relative  shadow-lg shadow-black p-2 `}>
      <div className="relative bg-[#290404]   bg- h-full w-full rounded-md  shadow-sm border-2 border-gray-500/50 shadow-black   flex flex-col">
        {id == 0 && <NavBar />}

        <ListCard
          cards={useJuego.state.jugadores[id].cartas}
          onCardaction={cardAction}
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
