import { CartaAccion, CartaComun, CartaComodin } from "./Carta";
import {
  TentacionStrategy,
  /* CreditoStrategy, */
  SilencioStrategy,
  TurnosRotativosStrategy,
  /* InfluencerStrategy, */
} from "./AccionStrategy";

export default class Baraja {
  cards: (CartaComun | CartaAccion | CartaComodin | null)[];
  cartas_usadas: (CartaComun | CartaAccion)[];

  constructor() {
    this.cards = [];
    this.cartas_usadas = [];
    this.crear_cartas();
    this.mezclar_cartas();
  }
  crear_cartas() {
    // Creacion de las sentimentales
    const cartas_rojas = Array.from(
      { length: 9 },
      (_, i) => new CartaComun("EUFORIA", "ROJO", "¡Lo necesito ya!", i + 1)
    );
    const cartas_azules = Array.from(
      { length: 9 },
      (_, i) =>
        new CartaComun("CALMA", "AZUL", "!Buscas relax comprando!", i + 1)
    );
    const cartas_amarillas = Array.from(
      { length: 9 },
      (_, i) =>
        new CartaComun("BRILLO", "AMARILLA", "¡Ansia de novedad!", i + 1)
    );
    const cartas_naranjas = Array.from(
      { length: 9 },
      (_, i) =>
        new CartaComun("IMPULSO", "NARANJA", "¡Auto-Mejora estetica!", i + 1)
    );
    this.cards = [
      ...cartas_rojas,
      ...cartas_azules,
      ...cartas_naranjas,
      ...cartas_amarillas,
    ];

    // Creacion de las cartas de accion
    // 8-'Toma dos | Tentacion'
    const cartas_rojas_tentacion = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "ROJO",
          "EUFORIA",
          new TentacionStrategy(),
          "Te muestran un anuncio tomas +2",
          "TENTACION"
        )
    );
    const cartas_azules_tentacion = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "AZUL",
          "CALMA",
          new TentacionStrategy(),
          "Te muestran un anuncio tomas +2",
          "TENTACION"
        )
    );
    const cartas_amarillas_tentacion = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "AMARILLA",
          "BRILLO",
          new TentacionStrategy(),
          "Te muestran un anuncio tomas +2",
          "TENTACION"
        )
    );
    const cartas_naranjas_tentacion = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "NARANJA",
          "IMPULSO",
          new TentacionStrategy(),
          "Te muestran un anuncio tomas +2",
          "TENTACION"
        )
    );
    this.cards = [
      ...this.cards,
      ...cartas_amarillas_tentacion,
      ...cartas_rojas_tentacion,
      ...cartas_naranjas_tentacion,
      ...cartas_azules_tentacion,
    ];

    // 8-'Reversa | Retorno'
    const cartas_rojas_reversa = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "ROJO",
          "EUFORIA",
          new TurnosRotativosStrategy(),
          "Cambia el flujo de los estímulos",
          "REVERSA"
        )
    );
    const cartas_azules_reversa = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "AZUL",
          "CALMA",
          new TurnosRotativosStrategy(),
          "Cambia el flujo de los estímulos",
          "REVERSA"
        )
    );
    const cartas_amarillas_reversa = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "AMARILLA",
          "BRILLO",
          new TurnosRotativosStrategy(),
          "Cambia el flujo de los estímulos",
          "REVERSA"
        )
    );
    const cartas_naranjas_reversa = Array.from(
      { length: 2 },
      () =>
        new CartaAccion(
          "NARANJA",
          "IMPULSO",
          new TurnosRotativosStrategy(),
          "Cambia el flujo de los estímulos",
          "REVERSA"
        )
    );
    this.cards = [
      ...this.cards,
      ...cartas_rojas_reversa,
      ...cartas_azules_reversa,
      ...cartas_amarillas_reversa,
      ...cartas_naranjas_reversa,
    ];

    // 8-'Salta | Silencio'
    const cartas_rojas_silencio = Array.from(
      { length: 1 },
      () =>
        new CartaAccion(
          "ROJO",
          "EUFORIA",
          new SilencioStrategy(),
          "El mercado te ignora",
          "SILENCIO"
        )
    );
    const cartas_azules_silencio = Array.from(
      { length: 1 },
      () =>
        new CartaAccion(
          "AZUL",
          "CALMA",
          new SilencioStrategy(),
          "El mercado te ignora",
          "SILENCIO"
        )
    );
    const cartas_amarillas_silencio = Array.from(
      { length: 1 },
      () =>
        new CartaAccion(
          "AMARILLA",
          "BRILLO",
          new SilencioStrategy(),
          "El mercado te ignora",
          "SILENCIO"
        )
    );
    const cartas_naranjas_silencio = Array.from(
      { length: 1 },
      () =>
        new CartaAccion(
          "NARANJA",
          "IMPULSO",
          new SilencioStrategy(),
          "El mercado te ignora",
          "SILENCIO"
        )
    );
    this.cards = [
      ...this.cards,
      ...cartas_rojas_silencio,
      ...cartas_azules_silencio,
      ...cartas_amarillas_silencio,
      ...cartas_naranjas_silencio,
    ];

    // 4-' Comodin cambia color | Influencer'
    /*    const cartas_rojas_comodin_color = Array.from(
      { length: 1 },
      () => new CartaComodin(new InfluencerStrategy())
    );
    const cartas_azules_comodin_color = Array.from(
      { length: 1 },
      () => new CartaComodin(new InfluencerStrategy())
    );
    const cartas_amarillas_comodin_color = Array.from(
      { length: 1 },
      () => new CartaComodin(new InfluencerStrategy())
    );
    const cartas_naranjas_comodin_color = Array.from(
      { length: 1 },
      () => new CartaComodin(new InfluencerStrategy())
    );
    this.cards = [
      ...this.cards,
      ...cartas_rojas_comodin_color,
      ...cartas_azules_comodin_color,
      ...cartas_amarillas_comodin_color,
      ...cartas_naranjas_comodin_color,
    ]; */

    // 4-'Comodin +4 | Credito-Facil'
    /* const cartas_rojas_comodin = Array.from(
      { length: 1 },
      () => new CartaComodin(new CreditoStrategy())
    );
    const cartas_azules_comodin = Array.from(
      { length: 1 },
      () => new CartaComodin(new CreditoStrategy())
    );
    const cartas_amarillas_comodin = Array.from(
      { length: 1 },
      () => new CartaComodin(new CreditoStrategy())
    );
    const cartas_naranjas_comodin = Array.from(
      { length: 1 },
      () => new CartaComodin(new CreditoStrategy())
    );
    this.cards = [
      ...this.cards,
      ...cartas_rojas_comodin,
      ...cartas_azules_comodin,
      ...cartas_amarillas_comodin,
      ...cartas_naranjas_comodin,
    ]; */
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

  obtener_carta(): CartaComun | CartaAccion | CartaComodin | null {
    for (let i = 0; i < this.cards.length; i++) {
      const carta = this.cards[i];
      if (carta != null && carta != undefined) {
        this.cards[i] = null; // Marcar que fue usada

        return carta;
      }
    }

    console.log("No hay cartas disponibles.");
    return null;
  }
}
