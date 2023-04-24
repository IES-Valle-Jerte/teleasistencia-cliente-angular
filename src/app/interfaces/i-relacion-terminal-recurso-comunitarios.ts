import {ITerminal} from "./i-terminal";
import {IRecursoComunitario} from "./i-recurso-comunitario";

export interface IRelacionTerminalRecursoComunitarios {
  id: number;
  id_terminal: ITerminal;
  id_recurso_comunitario: IRecursoComunitario;
  tiempo_estimado: number;
}
