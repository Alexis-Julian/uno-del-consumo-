import RuleVacio from "./Regla";
import type stateVacio from "./State";
import AccionComando from "./Comando";
import type { AccionStrategy } from "./AccionStrategy";
/* import notyf from "../libraries/notyf"; */

export default class JuegoVacio {
  reglas: RuleVacio;
  state: stateVacio;
  historial: AccionComando[];
  private setstate: React.Dispatch<React.SetStateAction<stateVacio>>;

  constructor(
    reglas: RuleVacio,
    state_inicial: stateVacio,
    setstate: React.Dispatch<React.SetStateAction<stateVacio>>
  ) {
    this.reglas = reglas;
    this.state = state_inicial;
    this.historial = [];
    this.setstate = setstate;
  }

  public jugar(accion: AccionStrategy) {
    const cmd = new AccionComando(this, accion);
    cmd.execute();
    this.setstate({ ...this.state });
    this.historial.push(cmd);
  }
}
