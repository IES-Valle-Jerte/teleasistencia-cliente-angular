import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRecursoComunitario} from '../interfaces/i-recurso-comunitario';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CargaRecursoComunitarioService {
  private urlBase = environment.urlBase;
  private URL_SERVER_RECURSOS_COMUNITARIOS = this.urlBase + 'recurso_comunitario';

  constructor(private http: HttpClient) {
  }

  getRecursosComunitarios(): Observable<IRecursoComunitario[]> {
    return this.http.get<IRecursoComunitario[]>(this.URL_SERVER_RECURSOS_COMUNITARIOS);
  }



  /*
  this.http.get('http://tu-dominio.com/api-rest/recurso_comunitario?id_tipos_recurso_comunitario__id_clasificacion_recurso_comunitario=1')
  .subscribe(data => {
    console.log(data);
  });

   */

 getDatosSanitario(idClasificacionRecurso: number): Observable<IRecursoComunitario[]>{
    return this.http.get<IRecursoComunitario[]>(this.URL_SERVER_RECURSOS_COMUNITARIOS + '?id_tipos_recurso_comunitario__id_clasificacion_recurso_comunitario=' +idClasificacionRecurso);
 }
  getRecursoComunitario(idRecursoComunitario: number): Observable<IRecursoComunitario> {
    return this.http.get<IRecursoComunitario>(this.URL_SERVER_RECURSOS_COMUNITARIOS + '/' + idRecursoComunitario);
  }

  modificarRecursoComunitario(recursoComunitario: IRecursoComunitario): Observable<IRecursoComunitario> {
    return this.http.put<IRecursoComunitario>(this.URL_SERVER_RECURSOS_COMUNITARIOS + '/' + recursoComunitario.id, recursoComunitario);
  }

  nuevoRecursoComunitario(recursoComunitario: IRecursoComunitario): Observable<IRecursoComunitario> {
    return this.http.post<IRecursoComunitario>(this.URL_SERVER_RECURSOS_COMUNITARIOS, recursoComunitario);
  }

  eliminarRecursoComunitario(recursoComunitario:IRecursoComunitario): Observable<IRecursoComunitario> {
    return this.http.delete<IRecursoComunitario>(this.URL_SERVER_RECURSOS_COMUNITARIOS + '/' + recursoComunitario.id);
  }
}
