import type { AccionStrategy } from "./AccionStrategy";
import type { typesCards } from "../types/card";
// Discriminador de tipos

abstract class Card {
  static idUnique = 0;
  public comment: string;
  public type: typesCards;
  public color: string;
  public id: number;

  constructor(comment: string, color: string) {
    this.comment = comment;
    this.type = "common";
    this.color = color;
    this.id = ++Card.idUnique;
  }
}

export class ActionCard extends Card {
  public action: AccionStrategy;
  public action_name: string;
  constructor(
    comment: string,
    color: string,
    action: AccionStrategy,
    action_name: string
  ) {
    super(comment, color);
    this.action = action;
    this.type = "action";
    this.action_name = action_name;
  }
}
export class CommunCard extends Card {
  number: number;
  feeling: string;
  constructor(comment: string, color: string, number: number, feeling: string) {
    super(comment, color);
    this.number = number;
    this.feeling = feeling;
    this.type = "common";
  }
}
