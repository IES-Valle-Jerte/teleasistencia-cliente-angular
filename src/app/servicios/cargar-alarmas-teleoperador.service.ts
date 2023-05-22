import { Injectable } from '@angular/core';
import {IRelacionUsuarioCentro} from "../interfaces/i-relacion-usuario-centro";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ITeleoperador} from "../interfaces/i-teleoperador";
import {IAlarma} from "../interfaces/i-alarma";

@Injectable({
  providedIn: 'root'
})
export class CargarAlarmasTeleoperadorService {

  private urlBase = environment.urlBase;
  private URL_SERVER_SEGUIMIENTO = this.urlBase + 'seguimiento_teleoperador';

  constructor(private http: HttpClient) {
  }

  getAlarmasTeleoperador(alarmasTeleoperador:ITeleoperador): Observable<IAlarma[]> {
    return this.http.get<IAlarma[]>(this.URL_SERVER_SEGUIMIENTO+'/'+alarmasTeleoperador.id);
  }

}
