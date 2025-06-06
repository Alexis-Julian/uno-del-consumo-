import { type AnyCard } from "../../types/card";
import type { ButtonProps } from "../Card/Card.types";

export interface IsPlayer {
  isPlayer: boolean;
}

export interface ListCardProps extends ButtonProps {
  cards: (AnyCard | null)[];
  isPlayer: boolean;
}
