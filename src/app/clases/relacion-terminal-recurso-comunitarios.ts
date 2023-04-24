import {IRelacionTerminalRecursoComunitarios} from "../interfaces/i-relacion-terminal-recurso-comunitarios";

export class RelacionTerminalRecursoComunitarios implements IRelacionTerminalRecursoComunitarios{
  id: number;
  id_terminal: any;
  id_recurso_comunitario: any;
  tiempo_estimado: number;
}

