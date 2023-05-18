import {IDireccion} from './i-direccion';
import {ITipoRecursoComunitario} from './i-tipo-recurso-comunitario';

export interface IRecursoComunitario {
  id: number;
  nombre: string;
  telefono: string;
  // Necesitamos otras interfaces para completar el recurso comunitario
  id_tipos_recurso_comunitario: ITipoRecursoComunitario;
  id_direccion: IDireccion;
}
