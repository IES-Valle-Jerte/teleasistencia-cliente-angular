import {IPaciente} from "./i-paciente";

export interface IRelacionPacientePersona {
  id: number;
  nombre: string;
  apellidos: string;
  telefono:number;
  tipo_relacion: string;
  tiene_llaves_vivienda: boolean;
  disponibilidad: string;
  observaciones: string;
  prioridad: number;
  es_conviviente: boolean,
  tiempo_domicilio: number;
  id_paciente: IPaciente;
}
