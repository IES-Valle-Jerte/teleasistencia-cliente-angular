import {ITipoAgenda} from "../interfaces/i-tipo-agenda";

export class TipoAgenda implements ITipoAgenda {
  id: number;
  nombre: string;
  codigo: string;
  importancia: string;
}
