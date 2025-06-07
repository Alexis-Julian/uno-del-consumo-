import { type AnyCard } from "../../types/card";
import type { ButtonProps } from "../Card/Card.types";

export interface ListCardProps extends ButtonProps {
  cards: (AnyCard | null)[];
  back?: boolean;
  scrollable?: boolean;
  style?: React.CSSProperties;
}
