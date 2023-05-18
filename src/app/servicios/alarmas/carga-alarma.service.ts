import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IAlarma} from "../../interfaces/i-alarma";

@Injectable({
  providedIn: 'root'
})
export class CargaAlarmaService {
  private urlBase = environment.urlBase;
  private URL_SERVER_ALARMA = this.urlBase + 'alarma';
  constructor(private http: HttpClient) {  }

    getAlarmas(): Observable<IAlarma> {
      return this.http.get<IAlarma>(this.URL_SERVER_ALARMA);
    }

    getAlarma(idAlarma: number): Observable<IAlarma> {
      return this.http.get<IAlarma>(this.URL_SERVER_ALARMA+ '/' + idAlarma);
    }
    getAlarmasPorFecha(fecha_registro:string): Observable<IAlarma> {
      return this.http.get<IAlarma>(this.URL_SERVER_ALARMA+ '?fecha_registro=' + fecha_registro);
    }

    modificarAlarma(alarma: IAlarma): Observable<IAlarma> {
      return this.http.put<IAlarma>(this.URL_SERVER_ALARMA+ '/' + alarma.id, alarma);
    }
    cerrarAlarma(alarma: object ,idAlarma:number): Observable<IAlarma> {
      return this.http.put<IAlarma>(this.URL_SERVER_ALARMA+ '/' + idAlarma, alarma);
    }

    nuevaAlarma(alarma: any): Observable<IAlarma> {
      return this.http.post<IAlarma> (this.URL_SERVER_ALARMA, alarma);
    }

    eliminarAlarma(alarma: IAlarma): Observable<IAlarma> {
      return this.http.delete<IAlarma> (this.URL_SERVER_ALARMA +'/'+ alarma.id);
    }

}
