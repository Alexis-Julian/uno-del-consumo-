import {
  AcumulacionStrategy,
  CreditoStrategy,
  FinDeJuegoStrategy,
  FinDeRondaStrategy,
  InfluencerStrategy,
  IniciarJuegoStrategy,
  JugarCartaStrategy,
  PasarTurnoStrategy,
  ResacaStrategy,
  RobarCartaStrategy,
  RoboDosVeces,
  SilencioStrategy,
  TentacionStrategy,
  TerapiaStrategy,
  TurnosRotativosStrategy,
  type AccionStrategy,
} from "./domain/AccionStrategy";

export const COLORES_SENTIMIENTOS: readonly [string, string][] = [
  ["ROJO", "EUFORIA"],
  ["AZUL", "CALMA"],
  ["AMARILLO", "BRILLO"],
  ["NARANJA", "IMPULSO"],
];

export type NombreSentimientos = "EUFORIA" | "CALMA" | "BRILLO" | "IMPULSO";

export const SENTIMIENTOS_COLORES_VACIO: Record<NombreSentimientos, string> = {
  EUFORIA: "#ff4f7e",
  CALMA: "#4fabff",
  BRILLO: "#ffd84f",
  IMPULSO: "#ff924f",
};
export type NombreRegla =
  | "carta1"
  | "carta2"
  | "carta3"
  | "carta4"
  | "carta5"
  | "carta6"
  | "carta7"
  | "validacion_micro"
  | "robar_carta"
  | "validacion"
  | "fin_juego"
  | "fin_ronda"
  | "iniciar_juego"
  | "jugar_carta"
  | "pasar_turno";

export const REGLAS_VACIO: Record<NombreRegla, AccionStrategy> = {
  // Strategy de cartas
  carta4: new TurnosRotativosStrategy(),
  carta1: new InfluencerStrategy(),
  carta2: new CreditoStrategy(),
  carta3: new ResacaStrategy(),
  carta5: new SilencioStrategy(),
  carta6: new TentacionStrategy(),
  carta7: new TerapiaStrategy(),
  //Strategy de micro-game
  validacion_micro: new RoboDosVeces(),
  robar_carta: new RobarCartaStrategy(),
  pasar_turno: new PasarTurnoStrategy(),
  fin_juego: new FinDeJuegoStrategy(),
  fin_ronda: new FinDeRondaStrategy(),
  iniciar_juego: new IniciarJuegoStrategy(),

  // Strategy de macro-game
  jugar_carta: new JugarCartaStrategy(),
  validacion: new AcumulacionStrategy(),
};
