import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUsers} from "../interfaces/i-users";
import {IUserAlarmasAgendasResueltas} from "../interfaces/i-UserAlarmasAgendasResueltas";
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

  getAgendasyAlarmasResueltasTotales(): Observable<IUserAlarmasAgendasResueltas[]> {
    return this.http.get<IUserAlarmasAgendasResueltas[]>(this.URL_SERVER_SEGUIMIENTO);
  }

  getAgendasyAlarmasResueltas(idUser:number):Observable<IAgenda>{
    return this.http.get<IAgenda>(this.URL_SERVER_SEGUIMIENTO+'/'+idUser);
  }
}
