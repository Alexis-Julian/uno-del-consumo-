import type { AnyCard } from "../../types/card";

export type Props = AnyCard & ButtonProps & { isPlayer: boolean };

export interface ButtonProps {
  onCardaction?: (index?: number) => void;
}
