import { AnimatePresence, motion } from "framer-motion";
import Card from "../Card/Card";
import type { ListCardProps } from "./ListCard.types";

export default function ListCard({
  cards,
  onCardaction,
  back,
  scrollable = true,
  style,
}: ListCardProps) {
  return (
    <motion.ul
      className={`h-full w-full z-10 flex flex-wrap ${
        scrollable ? "overflow-scroll" : "overflow-hidden"
      } relative overflow-x-hidden transition-all`}
      style={style}
      layoutScroll
    >
      <AnimatePresence mode="wait">
        {cards.map((e, idx) => {
          return e ? (
            <motion.li
              key={idx}
              // flip visual cuando cambia de mano a mesa
              whileHover={{ scale: 1.05 }}
              layoutId={String(e.id)}
            >
              {!back ? (
                <Card
                  key={idx}
                  {...e}
                  onCardaction={onCardaction && onCardaction}
                />
              ) : (
                <div className="h-[294px] w-[194px] border-white border-2 bg-[url('/src/assets/trasera.png')]  bg-cover bg-center bg-no-repeat bg- "></div>
              )}
            </motion.li>
          ) : null;
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
