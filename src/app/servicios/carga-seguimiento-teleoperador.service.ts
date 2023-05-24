import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUsers} from "../interfaces/i-users";
import {ITeleoperador} from "../interfaces/i-teleoperador";
import {IAlarma} from "../interfaces/i-alarma";
import {IAgenda} from "../interfaces/i-agenda";

@Injectable({
  providedIn: 'root'
})
export class CargaSeguimientoTeleoperadorService {

  private urlBase = environment.urlBase;
  private URL_SERVER_SEGUIMIENTO = this.urlBase + 'seguimiento_teleoperador';

  constructor(private http: HttpClient) {
  }

  getTeleoperadores(): Observable<ITeleoperador[]> {
    return this.http.get<ITeleoperador[]>(this.URL_SERVER_SEGUIMIENTO);
  }

  getAgendasResueltas(idUser:number):Observable<IAgenda>{
    return this.http.get<IAgenda>(this.URL_SERVER_SEGUIMIENTO+'/'+idUser);
  }

  getAlarmasResueltas(idUser:number):Observable<IAlarma>{
    return this.http.get<IAlarma>(this.URL_SERVER_SEGUIMIENTO+'/'+idUser);
  }
}
