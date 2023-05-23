import {IRelacionPacientePersona} from "../interfaces/i-relacion-paciente-persona";
import {IPaciente} from "../interfaces/i-paciente";

export class RelacionPacientePersona implements IRelacionPacientePersona{
  id: number;
  telefono:number;
  apellidos: string;
  nombre: string;
  tipo_relacion: string;
  tiene_llaves_vivienda: boolean;
  disponibilidad: string;
  observaciones: string;
  prioridad: number;
  es_conviviente: boolean;
  tiempo_domicilio: number;
  id_paciente: any;
}
