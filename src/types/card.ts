import { CommunCard, ActionCard } from "../domain/Carta";

export type feelings = "euforia" | "calma" | "brillo" | "impulso";
export type colors = "rojo" | "azul" | "amarillo" | "naranja";
export type actions = "temptation" | "reverse" | "silence";
export type typesCards = "common" | "action";
export type AnyCard = CommunCard | ActionCard;
