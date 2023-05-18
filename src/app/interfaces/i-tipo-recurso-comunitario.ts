import {IClasificacioRecurso} from "./i-clasificacio-recurso";

export interface ITipoRecursoComunitario { // Con esta interfaz identificaremos cual es el tipo de recursos comunitario
  id: any;
  id_clasificacion_recurso_comunitario: IClasificacioRecurso;
  nombre: string;

}
