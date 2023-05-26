import {IAgenda} from "./i-agenda";
import {IAlarma} from "./i-alarma";

export interface ISeguimiento_teleoperador {
  agendas: IAgenda[],
  agendas_total: Number,
  alarmas: IAlarma[],
  first_name:String,
  id:Number,
  second_name:String,
  alarma_total:Number
}
