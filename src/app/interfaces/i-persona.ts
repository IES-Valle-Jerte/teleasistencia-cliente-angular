import {IDireccion} from './i-direccion';

export interface IPersona {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  fecha_nacimiento: Date;
  sexo: string;
  telefono_fijo: string;
  telefono_movil: string;
  id_direccion: IDireccion;
}
