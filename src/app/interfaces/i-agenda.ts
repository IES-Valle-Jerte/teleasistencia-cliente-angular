import {IPaciente} from "./i-paciente";
import {ITipoAgenda} from "./i-tipo-agenda";
import {IPersona} from "./i-persona";

export interface IAgenda {
  id: number;
  id_paciente: any;
  id_tipo_agenda: any;
  fecha_registro: Date;
  fecha_prevista: Date;
  fecha_resolucion: Date;
  observaciones: string;
}
