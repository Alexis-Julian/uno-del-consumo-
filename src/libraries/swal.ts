import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

export default class AlertaJuego {
  static cartaInvalida() {
    MySwal.fire({
      icon: "error",
      title: "¡Carta inválida!",
      text: "No podés jugar esa carta.",
    });
  }

  static victoria() {
    MySwal.fire({
      title: "¡VACÍO!",
      text: "Te liberaste de todas las cartas ✨",
      width: "60%",
      background: "black",
      imageWidth: 200,
      imageHeight: 200,
      toast: true,
      imageAlt: "Ganador",
      position: "top-right",
      confirmButtonText: "Jugar de nuevo",
    });
  }
  static cartaAccion(mensaje: string) {
    MySwal.fire({
      customClass: {
        htmlContainer: "texto-cartaAccion",
        popup: "popup-cartaAccion",
      },
      text: mensaje,
      width: "auto",
      toast: true,
      imageAlt: "Ganador",
      position: "top-right",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  static turnoJugador(jugador: string) {
    MySwal.fire({
      title: `Turno de ${jugador}`,
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  static confirmarPaso(callback: () => void) {
    MySwal.fire({
      title: "¿Pasar turno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if (r.isConfirmed) callback();
    });
  }
}
