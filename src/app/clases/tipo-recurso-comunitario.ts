import {ITipoRecursoComunitario} from '../interfaces/i-tipo-recurso-comunitario';
import {IClasificacioRecurso} from "../interfaces/i-clasificacio-recurso";

export class TipoRecursoComunitario implements ITipoRecursoComunitario {
  id: number;
  id_clasificacion_recurso_comunitario: any;
  nombre: string;

}
