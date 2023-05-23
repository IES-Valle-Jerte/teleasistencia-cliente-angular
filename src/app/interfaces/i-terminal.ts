import {ITipoVivienda} from "./i-tipo-vivienda";
import {IPaciente} from "./i-paciente";

export interface ITerminal {
  id: number;
  numero_terminal: string;
  modo_acceso_vivienda: string;
  barreras_arquitectonicas: string;
  modelo_terminal: string;
  id_titular: IPaciente;
  id_tipo_vivienda: ITipoVivienda;
  id_tipo_situacion: number;
  fecha_tipo_situacion: Date;
}
