import { type CualquierCarta } from "../../domain/Carta";
export interface ListCardProps {
  cards: (CualquierCarta | null)[];
  onCardaction?: (index: number) => void;
}
