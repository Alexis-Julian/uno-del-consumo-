import { CommunCard, ActionCard } from "./Carta";

import type { AnyCard, actions } from "../types/card";

import { COLORS_FEELINGS, ACTIONS_WITH_STRATEGYS } from "../constants/card";

export default class Baraja {
  cards: AnyCard[];
  cartas_usadas: AnyCard[];

  constructor() {
    this.cards = [];
    this.cartas_usadas = [];
    this.crear_cartas();
    this.mezclar_cartas();
  }

  private createCommunCard() {
    /*  Array de colores*/
    const coloresKeys = Object.keys(
      COLORS_FEELINGS
    ) as (keyof typeof COLORS_FEELINGS)[];

    /* Array de sentimientos */
    const sentimientosValues = Object.values(COLORS_FEELINGS);

    /* Array de nuevas cartas */
    const nuevasCartas: CommunCard[] = [];

    const feelingsMessage = {
      euforia: "¡Lo necesito!",
      calma: "¡Busco relax comprando!",
      brillo: "¡Eso me encanta!",
      impulso: "¡No puedo resistirme!",
    };

    /* Creacion de las cartas  */
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 9; j++) {
        nuevasCartas.push(
          new CommunCard(
            feelingsMessage[sentimientosValues[i]],
            coloresKeys[i],
            j + 1,
            sentimientosValues[i]
          )
        );
      }
    }

    /* Asignacion de las cartas en el array de cartas de la clase */
    this.cards = [...this.cards, ...nuevasCartas];
  }

  private createActionCard() {
    /*  Array de colores*/
    const coloresKeys = Object.keys(
      COLORS_FEELINGS
    ) as (keyof typeof COLORS_FEELINGS)[];

    const dictActionMessage = {
      temptation: "¡Te sentiste atraido por una moda!",
      reverse: "!La moda cambio de sentido!",
      silence: "!El mercado te silencia!",
    };

    /* Itera sobre cada accion y por cada accion va iterar sobre los 4 colores y 
    por cada esos 4 colores va sacar 2 cartas */
    /* TENTACION | REVERSA | SILENCIO | NARANJA */
    const ActionCards: ActionCard[] = [];
    for (const action in ACTIONS_WITH_STRATEGYS) {
      for (const color of coloresKeys) {
        for (let index = 0; index < 2; index++) {
          ActionCards.push(
            new ActionCard(
              dictActionMessage[action as actions],
              color,
              ACTIONS_WITH_STRATEGYS[
                action as keyof typeof ACTIONS_WITH_STRATEGYS
              ],
              action as actions,
              COLORS_FEELINGS[color]
            )
          );
        }
      }
    }

    /* Implementar cartas de acciones al array principal */
    this.cards = [...this.cards, ...ActionCards];
  }

  /* 2 | 2 | 2 | 2 */
  crear_cartas() {
    /* Creacion de las cartas comunes */
    this.createCommunCard();
    this.createActionCard();
  }

  mezclar_cartas(): void {
    // Filtramos solo las cartas disponibles (no nulas)
    const cartas_disponibles = this.cards.filter(
      (carta) => carta !== null && carta !== undefined
    );

    // Mezcla con algoritmo de Fisher-Yates
    for (let i = cartas_disponibles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas_disponibles[i], cartas_disponibles[j]] = [
        cartas_disponibles[j],
        cartas_disponibles[i],
      ];
    }

    // Reconstruimos el mazo mezclado en `this.cards`
    let index = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i] !== null && this.cards[i] !== undefined) {
        this.cards[i] = cartas_disponibles[index];
        index++;
      }
    }
  }

  entregar_carta() {
    return;
  }

  reinsertar_carta(cartas_usadas: AnyCard[]) {
    this.cards = cartas_usadas;
    this.mezclar_cartas();
  }

  obtener_carta(): AnyCard {
    if (this.cards.length < 1) {
      this.mezclar_cartas();
    }

    const copyCards = this.cards;
    const anyCard: AnyCard = copyCards[0];
    copyCards.reverse();
    copyCards.splice(-1);

    this.cards = copyCards;

    return anyCard;
  }
}
