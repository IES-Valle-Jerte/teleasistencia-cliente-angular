import {IPersona} from '../interfaces/i-persona';
import {IDireccion} from '../interfaces/i-direccion';

export class Persona implements IPersona {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  fecha_nacimiento: Date;
  sexo: string;
  telefono_fijo: string;
  telefono_movil: string;
  localidad: string;
  provincia: string;
  direccion: string;
  codigo_postal: string;
  id_direccion: IDireccion;


}
