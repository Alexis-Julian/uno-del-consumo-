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
      {cards.map((e, idx) => {
        return e ? (
          <li key={idx}>
            <Card
              key={idx}
              {...e}
              onCardaction={onCardaction && onCardaction}
              isPlayer={isPlayer}
            />
          </li>
        ) : null;
      })}
    </ul>
  );
}
