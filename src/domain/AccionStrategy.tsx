import { reproducirSonido } from "../helpers";
import notyf from "../libraries/notyf";
import AlertaJuego from "../libraries/swal";
import type EstadoVacio from "./Estado";
// ESTRETEGIAS DEL MICRO-JUEGO

export interface AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio;
}

// Pasar jugada

export class PasarTurnoStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    estado.puede_jugar_nuevamente = false;
    estado.puede_pasar = false;
    estado.puede_robar = false;
    return estado;
  }
}

// Obtener carta del pozo
export class RobarCartaStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    const carta = estado.baraja.obtener_carta();
    // Si el mazo no devuelve mas cartas usar una strategy para volver a barajar con las cartas
    if (!carta) {
      console.log("Mazo totalmente usado");
      estado.baraja.reinsertar_carta(estado.cartas_usadas);
      return this.ejecutarAccion(estado);
    }

    // Agregamos una carta al jugador que estaba en turno activo
    estado.jugadores[estado.turno].cartas.push(carta);

    estado.puede_jugar_nuevamente = true;
    estado.puede_pasar = true;
    estado.puede_robar = false;
    return estado;
  }
}

export class JugarCartaStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    const jugador = estado.jugadores[estado.turno];
    const carta = jugador.carta_activa;
    const cartaEnJuego = estado.cartaActual;

    if (!carta) {
      console.log("No hay carta activa para jugar.");
      return estado;
    }

    if (!cartaEnJuego) {
      console.log("No hay carta en juego para comparar.");
      return estado;
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
          "numero" in carta &&
          "numero" in cartaEnJuego &&
          carta.numero === cartaEnJuego.numero
        ) {
          reproducirSonido("/uno-del-consumo/card.mp3");
          cartaValida = true;
        } else if (
          "sentimiento" in carta &&
          "sentimiento" in cartaEnJuego &&
          carta.sentimiento === cartaEnJuego.sentimiento
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
          "sentimiento" in carta &&
          "sentimiento" in cartaEnJuego &&
          carta.sentimiento === cartaEnJuego.sentimiento
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
      estado.puede_jugar_nuevamente = true;
      return estado;
    }

    // Jugar la carta
    jugador.cartas = jugador.cartas.filter((c) => c !== carta);
    // Carta que el jugador tiene activa cambiar logica
    jugador.carta_activa = null;
    estado.cartaActual = carta;
    estado.cartas_usadas.push(carta);

    /* CUANDO LO QUE JUEGA ES UNA CARA DE ACCION */
    if ("action" in carta) {
      estado = carta.action.ejecutarAccion(estado);
      if ("comment" in carta && estado.turno == 1) {
        AlertaJuego.cartaAccion(carta.comment);
      }

      return estado;
    }
    /* CUANDO LO QUE JUEGA ES UNA CARTA COMUN */
    if (estado.puede_jugar_nuevamente == true && "numero" in carta) {
      estado.puede_robar = false;
      estado.puede_jugar_nuevamente = false;
      estado.puede_pasar = false;
    }
    return estado;
  }
}

// No robar mas de dos veces siguiente paso
export class RoboDosVeces implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    return estado;
  }
}

// Acumulacion de de variante o de cartas de accion
export class AcumulacionStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    return estado;
  }
}

// Quien juega esta carta descarta hasta 2 Resaca de tu mano, pero pagas +1 Deuda colectiva
export class TerapiaStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    // Logica de la strategy
    return estado;
  }
}

// Cambia el sentido de la ronda. Si la ronda avanzaba hacia la izquierda,
// será el turno del Consumidor de la derecha y viceversa.
// Esta carta solamente se puede jugar con cartas que coincidan con la emoción correspondiente.
export class ResacaStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    // Logica de la strategy
    return estado;
  }
}

// Quien juega esta carta decide con que emoción va a continuar la ronda y
// además obliga al siguiente consumidor a tener 4 emociones nuevas y avanza el marcador de deuda colectiva +2
export class CreditoStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    // Logica de la strategy
    return estado;
  }
}

// Cuando se coloca esta carta, el consumidor siguiente deberá tomar 2 cartas del mazo y perder su turno.
// Esta carta solo puede jugarse sobre cartas que coincidan con la emoción o sobre otras
// – Además genera 1 Resaca y la añade a su mano
export class TentacionStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    let turno_enemigo: number;
    /*  const cartas_agregar = []; */
    if (estado.turno == 0) {
      turno_enemigo = 1;
    } else {
      turno_enemigo = 0;
    }
    for (let index = 0; index < 2; index++) {
      estado.jugadores[turno_enemigo].cartas.push(
        estado.baraja.obtener_carta()
      );
    }

    /* PUEDE JUGAR NUEVAMENTE? */
    estado.puede_robar = false;
    estado.puede_jugar_nuevamente = false;
    estado.puede_pasar = false;
    return estado;
  }
}

// El consumidor siguiente no realizara ninguna jugada y pierde el turno.
// Esta carta solamente se puede jugar sobre la emoción correspondiente
export class SilencioStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    // Logica de la strategy

    estado.puede_robar = true;
    estado.puede_jugar_nuevamente = true;
    estado.puede_pasar = false;
    return estado;
  }
}

// Horario o antihorario, afectado por la carta de cambio de sentido
export class TurnosRotativosStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    if (estado.flujo == "normal") {
      estado.flujo = "invertido";
    } else {
      estado.flujo = "normal";
    }

    estado.puede_robar = true;
    estado.puede_jugar_nuevamente = true;
    estado.puede_pasar = false;
    return estado;
  }
}

// Quien juegue un comodín debería decir en voz alta si cambia la emoción correspondiente.
export class InfluencerStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    // Logica de la strategy
    return estado;
  }
}

// ESTRETEGIAS DEL MACRO-JUEGO

// Cada jugador recibe 7 cartas
// Se revela una carta inicial del del mazo (No puede ser una carta especial o de accion)
export class IniciarJuegoStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    while (true) {
      estado.cartaActual = estado.baraja.obtener_carta();
      console.log(estado.cartaActual);
      if (estado.cartaActual.type == "common") {
        break;
      }
    }

    for (let i = 0; i < estado.jugadores.length; i++) {
      for (let j = 0; j < 7; j++) {
        estado.jugadores[i].cartas.push(estado.baraja.obtener_carta());
      }
    }

    return estado;
  }
}

// Jugador que se quede sin cartas se suman los puntos de los demas
export class FinDeRondaStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    return estado;
  }
}

// Juego entero hasta 500 puntos
export class FinDeJuegoStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    return estado;
  }
}

export class CantarVacioStrategy implements AccionStrategy {
  ejecutarAccion(estado: EstadoVacio): EstadoVacio {
    return estado;
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
