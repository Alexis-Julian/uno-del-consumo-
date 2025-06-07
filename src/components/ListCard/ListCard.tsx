import { AnimatePresence, motion } from "framer-motion";
import Card from "../Card/Card";
import type { ListCardProps } from "./ListCard.types";

export default function ListCard({
  cards,
  onCardaction,
  isPlayer,
}: ListCardProps) {
  return (
    <ul
      className={`h-[90%] w-full z-10 flex flex-wrap overflow-scroll relative overflow-x-hidden transition-all`}
    >
      <AnimatePresence mode="sync">
        {cards.map((e, idx) => {
          return e ? (
            <motion.li
              key={idx}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 40,
              }}
              // flip visual cuando cambia de mano a mesa
              whileHover={{ scale: 1.05 }}
              layoutId={String(e.id)}
            >
              <Card
                key={idx}
                {...e}
                onCardaction={onCardaction && onCardaction}
                isPlayer={isPlayer}
              />
            </motion.li>
          ) : null;
        })}
      </AnimatePresence>
    </ul>
  );
}
