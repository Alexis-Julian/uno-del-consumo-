import Card from "../Card/Card";
import type { ListCardProps } from "./ListCard.types";
import { motion } from "framer-motion";

export default function ListCard({ cards, onCardaction }: ListCardProps) {
  return (
    <ul
      className={`h-[90%] w-full z-10 flex flex-wrap overflow-scroll relative overflow-x-hidden transition-all`}
    >
      {cards.map((e, idx) => {
        return e ? (
          <motion.li
            /* layoutId={} */
            className={`${onCardaction && "cursor-pointer"}`}
            onClick={onCardaction ? () => onCardaction(idx) : undefined}
          >
            <Card key={idx} {...(e as React.ComponentProps<typeof Card>)} />
          </motion.li>
        ) : null;
      })}
    </ul>
  );
}
