import { type AccionStrategy } from "../domain/AccionStrategy";
import type {
  feelings as typeFeelings,
  colors as typeColors,
  actions as typeAction,
} from "../types/card";
import { RULES_VACIO } from "./reglas";

export const FEELINGS_COLORS: Record<typeFeelings, typeColors> = {
  euforia: "rojo",
  calma: "azul",
  brillo: "amarillo",
  impulso: "naranja",
};

export const COLORS_FEELINGS: Record<typeColors, typeFeelings> = {
  rojo: "euforia",
  azul: "calma",
  amarillo: "brillo",
  naranja: "impulso",
};

export const ACTIONS: typeAction[] = [
  "reverse",
  "silence",
  "temptation",
] as const;

export const ACTIONS_WITH_STRATEGYS: Record<typeAction, AccionStrategy> = {
  reverse: RULES_VACIO["reverse_turn"],
  silence: RULES_VACIO["silence_card"],
  temptation: RULES_VACIO["temptation_card"],
};

export const feelings: typeFeelings[] = [
  "brillo",
  "calma",
  "euforia",
  "impulso",
] as const;

export const colors: typeColors[] = [
  "amarillo",
  "naranja",
  "rojo",
  "azul",
] as const;
