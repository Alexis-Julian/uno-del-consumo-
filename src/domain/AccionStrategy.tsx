import { reproducirSonido } from "../helpers";
import notyf from "../libraries/notyf";
import AlertaJuego from "../libraries/swal";
import type stateVacio from "./State";
// ESTRETEGIAS DEL MICRO-JUEGO

export interface AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio;
}

// Pasar jugada

export class PasarTurnoStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    state.puede_jugar_nuevamente = false;
    state.puede_pasar = false;
    state.puede_robar = false;
    return state;
  }
}

// Obtener carta del pozo
export class RobarCartaStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    const carta = state.baraja.obtener_carta();
    // Si el mazo no devuelve mas cartas usar una strategy para volver a barajar con las cartas
    if (!carta) {
      console.log("Mazo totalmente usado");
      state.baraja.reinsertar_carta(state.cartas_usadas);
      return this.ejecutarAccion(state);
    }

    // Agregamos una carta al jugador que estaba en turno activo
    state.jugadores[state.turno].cartas.push(carta);

    state.puede_jugar_nuevamente = true;
    state.puede_pasar = true;
    state.puede_robar = false;
    return state;
  }
}

export class JugarCartaStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    const jugador = state.jugadores[state.turno];
    const carta = jugador.carta_activa;
    console.log(carta);
    const cartaEnJuego = state.cartaActual;
    if (!carta) {
      console.log("No hay carta activa para jugar.");
      return state;
    }

    if (!cartaEnJuego) {
      console.log("No hay carta en juego para comparar.");
      return state;
    }

    let cartaValida = false;
    switch (carta.type) {
      case "common": {
        // Validar por color, número o sentimiento
        // Solo accedemos a color/numero/sentimiento si existen en ambos objetos
        if (
          "color" in carta &&
          "color" in cartaEnJuego &&
          carta.color === cartaEnJuego.color
        ) {
          reproducirSonido("/uno-del-consumo/card.mp3");
          cartaValida = true;
        } else if (
          "number" in carta &&
          "number" in cartaEnJuego &&
          carta.number === cartaEnJuego.number
        ) {
          reproducirSonido("/uno-del-consumo/card.mp3");
          cartaValida = true;
        } else if (
          "feeling" in carta &&
          "feeling" in cartaEnJuego &&
          carta.feeling === cartaEnJuego.feeling
        ) {
          reproducirSonido("/uno-del-consumo/card.mp3");
          cartaValida = true;
        }
        break;
      }
      case "action": {
        if (
          "color" in carta &&
          "color" in cartaEnJuego &&
          carta.color === cartaEnJuego.color
        ) {
          cartaValida = true;
        } else if (
          "feeling" in carta &&
          "feeling" in cartaEnJuego &&
          carta.feeling === cartaEnJuego.feeling
        ) {
          reproducirSonido("/card.mp3");
          cartaValida = true;
        }
        break;
      }
      /*  case "comodin": {
        // Por ejemplo: CréditoStrategy siempre se puede jugar
        cartaValida =
          "accion" in carta && carta.accion instanceof CreditoStrategy;
        break;
      } */
    }

    if (!cartaValida) {
      console.log("Carta inválida. No se puede jugar.");
      notyf.error("Carta invalida");
      state.puede_jugar_nuevamente = true;
      return state;
    }

    // Jugar la carta
    jugador.cartas = jugador.cartas.filter((c) => c !== carta);
    // Carta que el jugador tiene activa cambiar logica
    jugador.carta_activa = null;
    state.cartaActual = carta;
    state.cartas_usadas.push(carta);

    /* CUANDO LO QUE JUEGA ES UNA CARA DE ACCION */
    if ("action" in carta) {
      state = carta.action.ejecutarAccion(state);
      if ("comment" in carta && state.turno == 1) {
        AlertaJuego.cartaAccion(carta.comment);
      }

      return state;
    }
    /* CUANDO LO QUE JUEGA ES UNA CARTA COMUN */
    if (state.puede_jugar_nuevamente == true && "number" in carta) {
      state.puede_robar = false;
      state.puede_jugar_nuevamente = false;
      state.puede_pasar = false;
    }
    return state;
  }
}

// No robar mas de dos veces siguiente paso
export class RoboDosVeces implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    return state;
  }
}

// Acumulacion de de variante o de cartas de accion
export class AcumulacionStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    return state;
  }
}

// Quien juega esta carta descarta hasta 2 Resaca de tu mano, pero pagas +1 Deuda colectiva
export class TerapiaStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    // Logica de la strategy
    return state;
  }
}

// Cambia el sentido de la ronda. Si la ronda avanzaba hacia la izquierda,
// será el turno del Consumidor de la derecha y viceversa.
// Esta carta solamente se puede jugar con cartas que coincidan con la emoción correspondiente.
export class ResacaStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    // Logica de la strategy
    return state;
  }
}

// Quien juega esta carta decide con que emoción va a continuar la ronda y
// además obliga al siguiente consumidor a tener 4 emociones nuevas y avanza el marcador de deuda colectiva +2
export class CreditoStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    // Logica de la strategy
    return state;
  }
}

// Cuando se coloca esta carta, el consumidor siguiente deberá tomar 2 cartas del mazo y perder su turno.
// Esta carta solo puede jugarse sobre cartas que coincidan con la emoción o sobre otras
// – Además genera 1 Resaca y la añade a su mano
export class TentacionStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    let turno_enemigo: number;
    /*  const cartas_agregar = []; */
    if (state.turno == 0) {
      turno_enemigo = 1;
    } else {
      turno_enemigo = 0;
    }
    for (let index = 0; index < 2; index++) {
      state.jugadores[turno_enemigo].cartas.push(state.baraja.obtener_carta());
    }

    /* PUEDE JUGAR NUEVAMENTE? */
    state.puede_robar = false;
    state.puede_jugar_nuevamente = false;
    state.puede_pasar = false;
    return state;
  }
}

// El consumidor siguiente no realizara ninguna jugada y pierde el turno.
// Esta carta solamente se puede jugar sobre la emoción correspondiente
export class SilencioStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    // Logica de la strategy

    state.puede_robar = true;
    state.puede_jugar_nuevamente = true;
    state.puede_pasar = false;
    return state;
  }
}

// Horario o antihorario, afectado por la carta de cambio de sentido
export class TurnosRotativosStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    if (state.flujo == "normal") {
      state.flujo = "invertido";
    } else {
      state.flujo = "normal";
    }

    state.puede_robar = true;
    state.puede_jugar_nuevamente = true;
    state.puede_pasar = false;
    return state;
  }
}

// Quien juegue un comodín debería decir en voz alta si cambia la emoción correspondiente.
export class InfluencerStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    // Logica de la strategy
    return state;
  }
}

// ESTRETEGIAS DEL MACRO-JUEGO

// Cada jugador recibe 7 cartas
// Se revela una carta inicial del del mazo (No puede ser una carta especial o de accion)
export class IniciarJuegoStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    while (true) {
      state.cartaActual = state.baraja.obtener_carta();
      if (state.cartaActual.type == "common") {
        break;
      }
    }

    for (let i = 0; i < state.jugadores.length; i++) {
      for (let j = 0; j < 7; j++) {
        state.jugadores[i].cartas.push(state.baraja.obtener_carta());
      }
    }

    return state;
  }
}

// Jugador que se quede sin cartas se suman los puntos de los demas
export class FinDeRondaStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    return state;
  }
}

// Juego entero hasta 500 puntos
export class FinDeJuegoStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    return state;
  }
}

export class CantarVacioStrategy implements AccionStrategy {
  ejecutarAccion(state: stateVacio): stateVacio {
    return state;
  }
}
/* export default {
  PasarTurnoStrategy,
  RobarCartaStrategy,
  JugarCartaStrategy,
  RoboDosVeces,
  AcumulacionStrategy,
  TerapiaStrategy,
  ResacaStrategy,
  CreditoStrategy,
  TentacionStrategy,
  SilencioStrategy,
  TurnosRotativosStrategy,
  InfluencerStrategy,
  IniciarJuegoStrategy,
  FinDeRondaStrategy,
  FinDeJuegoStrategy,
  CantarVacioStrategy,
}; */
