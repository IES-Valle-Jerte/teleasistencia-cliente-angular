import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRelacionTerminalRecursoComunitarios} from "../../interfaces/i-relacion-terminal-recurso-comunitarios";
import {environment} from "../../../environments/environment";
import {IRecursosComunitariosAlarma} from "../../interfaces/i-recursos-comunitarios-alarma";

@Injectable({
  providedIn: 'root'
})
export class CargaRelacionTerminalRecursosComunitariosService {
  private urlBase = environment.urlBase;
  private URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS = this.urlBase + 'relacion_terminal_recurso_comunitario';

  constructor(private http: HttpClient) { }

  getRelacionesTerminalesRecursosComunitarios(): Observable<IRelacionTerminalRecursoComunitarios[]> {
    return this.http.get<IRelacionTerminalRecursoComunitarios[]>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS);
  }
  getRelacionTerminalRecursoComunitario(idRelacion: number): Observable<IRelacionTerminalRecursoComunitarios> {
    return this.http.get<IRelacionTerminalRecursoComunitarios>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS+ '/' + idRelacion);
  }
  getRelacionTerminal(idRelacion: number): Observable<IRelacionTerminalRecursoComunitarios[]> {
    return this.http.get<IRelacionTerminalRecursoComunitarios[]>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS+ '?id_terminal=' + idRelacion);
  }
  modificarRelacionRecurso(relacionRecurso: IRelacionTerminalRecursoComunitarios): Observable<IRelacionTerminalRecursoComunitarios> {
    return this.http.put<IRelacionTerminalRecursoComunitarios>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS+'/'+ relacionRecurso.id, relacionRecurso);
  }
  nuevaRelacionRecurso(relacionRecurso:IRelacionTerminalRecursoComunitarios): Observable<IRelacionTerminalRecursoComunitarios> {
    return this.http.post<IRelacionTerminalRecursoComunitarios> (this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS, relacionRecurso);
  }
  eliminarRelacionRecurso(relacionRecurso: IRelacionTerminalRecursoComunitarios): Observable<IRelacionTerminalRecursoComunitarios> {
    return this.http.delete<IRelacionTerminalRecursoComunitarios>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS + '/' + relacionRecurso.id)
  }
  getRecursosComunitarioClasificacion(idTerminal:number,idClas:number): Observable<IRelacionTerminalRecursoComunitarios[]> {
    return this.http.get<IRelacionTerminalRecursoComunitarios[]>(this.URL_SERVER_RELACION_TERMINAL_RECURSOS_COMUNITARIOS + '?id_terminal=' + idTerminal+'&id_recurso_comunitario__id_tipos_recurso_comunitario__id_clasificacion_recurso_comunitario='+idClas);
  }
}

