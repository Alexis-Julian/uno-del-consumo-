import type { AnyCard } from "../../types/card";

export type Props = AnyCard & ButtonProps;

export interface ButtonProps {
  onCardaction?: (index?: number) => void;
}
