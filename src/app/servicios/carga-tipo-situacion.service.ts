import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITipoSituacion} from "../interfaces/i-tipo-situacion";
import {ITipoVivienda} from "../interfaces/i-tipo-vivienda";
import {IDireccion} from "../interfaces/i-direccion";

@Injectable({
  providedIn: 'root'
})

export class CargaTipoSituacionService {
  private urlBase = environment.urlBase;
  private URL_SERVER_TIPOS_SITUACIONES = this.urlBase + 'tipo_situacion';

  constructor(private http: HttpClient) { }

  getTiposSituaciones(): Observable<ITipoSituacion[]> {
    return this.http.get<ITipoSituacion[]>(this.URL_SERVER_TIPOS_SITUACIONES);
  }

  getTipoSituacion(idSituacion: number): Observable<ITipoSituacion> {
    return this.http.get<ITipoSituacion>(this.URL_SERVER_TIPOS_SITUACIONES + '/' + idSituacion);
  }

  modificarTipoSituacion(tipoSituacion: ITipoSituacion): Observable<ITipoSituacion> {
    return this.http.put<ITipoSituacion>(this.URL_SERVER_TIPOS_SITUACIONES + '/' + tipoSituacion.id, tipoSituacion);
  }

  nuevoTipoSituacion(tipoSituacion: ITipoSituacion): Observable<ITipoSituacion> {
    return this.http.post<ITipoSituacion>(this.URL_SERVER_TIPOS_SITUACIONES, tipoSituacion);
  }

  eliminarTipoSituacion(tipoSituacion:ITipoSituacion): Observable<ITipoSituacion> {
    return this.http.delete<ITipoSituacion>(this.URL_SERVER_TIPOS_SITUACIONES + '/' + tipoSituacion);
  }
}
