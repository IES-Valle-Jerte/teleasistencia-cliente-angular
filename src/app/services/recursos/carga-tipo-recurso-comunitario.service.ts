import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITipoRecursoComunitario} from '../../interfaces/i-tipo-recurso-comunitario';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CargaTipoRecursoComunitarioService {
  private urlBase = environment.urlBase;
  private URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS = this.urlBase + 'tipo_recurso_comunitario';

  constructor(private http: HttpClient) {
  }

  getTiposRecursosComunitarios(): Observable<ITipoRecursoComunitario[]> {
    return this.http.get<ITipoRecursoComunitario[]>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS);
  }

  getTipoRecursoComunitario(idTipoRecursoComunitario: number): Observable<ITipoRecursoComunitario> {
    return this.http.get<ITipoRecursoComunitario>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS + '/' + idTipoRecursoComunitario);
  }

  modificarTipoRecursoComunitario(tipoRecursoComunitario: ITipoRecursoComunitario): Observable<ITipoRecursoComunitario> {
    return this.http.put<ITipoRecursoComunitario>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS + '/' + tipoRecursoComunitario.id, tipoRecursoComunitario);
  }

  nuevoTipoRecursoComunitario(tipoRecursoComunitario: any): Observable<ITipoRecursoComunitario> {
    return this.http.post<ITipoRecursoComunitario>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS, tipoRecursoComunitario);
  }

  eliminarTipoRecursoComunitario(tipoRecursoComunitario: any): Observable<ITipoRecursoComunitario>{
    return this.http.delete<ITipoRecursoComunitario>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS + '/'+ tipoRecursoComunitario);
  }

  getTipoRecursoComunitarioClasificacion(id: any): Observable<ITipoRecursoComunitario[]>{
    return this.http.get<ITipoRecursoComunitario[]>(this.URL_SERVER_TIPOS_RECURSOS_COMUNITARIOS + '?id_clasificacion_recurso_comunitario=' + id);
  }

}
