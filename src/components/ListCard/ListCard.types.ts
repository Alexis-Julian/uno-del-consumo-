import { type AnyCard } from "../../types/card";
export interface ListCardProps {
  cards: (AnyCard | null)[];
  onCardaction?: (index: number) => void;
}
