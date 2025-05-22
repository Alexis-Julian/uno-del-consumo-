import RuleVacio from "./Regla";
import type EstadoVacio from "./Estado";
import AccionComando from "./Comando";
import type { AccionStrategy } from "./AccionStrategy";
/* import notyf from "../libraries/notyf"; */

export default class JuegoVacio {
  reglas: RuleVacio;
  estado: EstadoVacio;
  historial: AccionComando[];
  private setEstado: React.Dispatch<React.SetStateAction<EstadoVacio>>;

  constructor(
    reglas: RuleVacio,
    estado_inicial: EstadoVacio,
    setEstado: React.Dispatch<React.SetStateAction<EstadoVacio>>
  ) {
    this.reglas = reglas;
    this.estado = estado_inicial;
    this.historial = [];
    this.setEstado = setEstado;
  }

  public jugar(accion: AccionStrategy) {
    const cmd = new AccionComando(this, accion);
    cmd.execute();
    this.setEstado({ ...this.estado });
    this.historial.push(cmd);
  }
}
