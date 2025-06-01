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
} from "../domain/AccionStrategy";

export type RuleName =
  | "choose_emotion"
  | "reverse_turn"
  | "credit_card"
  | "hangover_card"
  | "silence_card"
  | "temptation_card"
  | "therapy_card"
  | "double_draw_check"
  | "draw_card"
  | "pass_turn"
  | "end_game"
  | "end_round"
  | "start_game"
  | "play_card"
  | "accumulation_check";

export const RULES_VACIO: Record<RuleName, AccionStrategy> = {
  // Strategy de cartas
  choose_emotion: new InfluencerStrategy(),
  reverse_turn: new TurnosRotativosStrategy(),
  credit_card: new CreditoStrategy(),
  hangover_card: new ResacaStrategy(),
  silence_card: new SilencioStrategy(),
  temptation_card: new TentacionStrategy(),
  therapy_card: new TerapiaStrategy(),

  // Strategy de micro-game
  double_draw_check: new RoboDosVeces(),
  draw_card: new RobarCartaStrategy(),
  pass_turn: new PasarTurnoStrategy(),
  end_game: new FinDeJuegoStrategy(),
  end_round: new FinDeRondaStrategy(),
  start_game: new IniciarJuegoStrategy(),
  // Strategy de macro-game
  play_card: new JugarCartaStrategy(),
  accumulation_check: new AcumulacionStrategy(),
};
