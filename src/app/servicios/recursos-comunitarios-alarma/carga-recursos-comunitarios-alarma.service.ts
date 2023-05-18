import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IRecursosComunitariosAlarma} from "../../interfaces/i-recursos-comunitarios-alarma";
import {ITipoRecursoComunitario} from "../../interfaces/i-tipo-recurso-comunitario";
import {IClasificacioRecurso} from "../../interfaces/i-clasificacio-recurso";

@Injectable({
  providedIn: 'root'
})
export class CargaRecursosComunitariosAlarmaService {
  private urlBase = environment.urlBase;
  private URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA = this.urlBase + 'recursos_comunitarios_en_alarma';
  private URL_SERVER_TIPOS_COMUNITARIOS = this.urlBase + 'clasificacion_recurso_comunitario';
  constructor(private http: HttpClient) { }

  getRecursosComunitariosAlarma(): Observable<IRecursosComunitariosAlarma[]> {
    return this.http.get<IRecursosComunitariosAlarma[]>(this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA);
  }

  getRecursoComunitarioAlarma(idRecursosComunitariosAlarma: number): Observable<IRecursosComunitariosAlarma> {
    return this.http.get<IRecursosComunitariosAlarma>(this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA+ '/' + idRecursosComunitariosAlarma);
  }
  getRecursoComunitarioAlarmaSegunId(idRecursosComunitariosAlarma: number,idClasi:number): Observable<IRecursosComunitariosAlarma[]> {
    return this.http.get<IRecursosComunitariosAlarma[]>(this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA+ '?id_alarma=' + idRecursosComunitariosAlarma + '&id_recurso_comunitario__id_tipos_recurso_comunitario__id_clasificacion_recurso_comunitario='+idClasi);
  }

  modificarRecursosComunitariosAlarma(recursosComunitariosAlarma: IRecursosComunitariosAlarma): Observable<IRecursosComunitariosAlarma> {
    return this.http.put<IRecursosComunitariosAlarma>(this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA+ '/' + recursosComunitariosAlarma.id, recursosComunitariosAlarma);
  }

  nuevaRecursosComunitariosAlarma(recursosComunitariosAlarma: any): Observable<IRecursosComunitariosAlarma> {
    return this.http.post<IRecursosComunitariosAlarma> (this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA, recursosComunitariosAlarma);
  }
  eliminarRecursosComunitariosAlarma(recursosComunitariosAlarma: IRecursosComunitariosAlarma): Observable<IRecursosComunitariosAlarma> {
    return this.http.delete<IRecursosComunitariosAlarma> (this.URL_SERVER_RECURSOS_COMUNITARIOS_ALARMA + '/' + recursosComunitariosAlarma.id);
  }
  tiposRecursosComunitarios(): Observable<IClasificacioRecurso[]>{
    return this.http.get<IClasificacioRecurso[]> (this.URL_SERVER_TIPOS_COMUNITARIOS);
  }






}
