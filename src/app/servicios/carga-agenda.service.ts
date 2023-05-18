import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {IAgenda} from "../interfaces/i-agenda";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CargaAgendaService {
  private urlBase = environment.urlBase;
  private URL_SERVER_AGENDAS = this.urlBase + 'agenda';

  constructor(private http: HttpClient) {
  }

  getAgendas(): Observable<IAgenda[]> {
    return this.http.get<IAgenda[]>(this.URL_SERVER_AGENDAS);
  }

  getAgenda(idAgenda: number): Observable<IAgenda> {
    return this.http.get<IAgenda>(this.URL_SERVER_AGENDAS + '/' + idAgenda);
  }

  getAgendaPorIdPaciente(idPaciente: number): Observable<IAgenda> {
    return this.http.get<IAgenda>(this.URL_SERVER_AGENDAS + '?id_paciente=' + idPaciente);
  }

  getAgendaPorIdTipoAgenda(idTipoAgenda: number): Observable<IAgenda> {
    return this.http.get<IAgenda>(this.URL_SERVER_AGENDAS + '?id_tipo_agenda=' + idTipoAgenda);
  }

  getAgendasPorFechaPrevista(fechaPrevista: string): Observable<IAgenda> {
    return this.http.get<IAgenda>(this.URL_SERVER_AGENDAS + '?fecha_prevista__startswith=' + fechaPrevista).pipe(take(1)).pipe(
      map(datos => {
        return datos;
      })
    );
  }

  getAgendasNoResueltas(fechaResolucion: any): Observable<IAgenda> {
    return this.http.get<IAgenda>(this.URL_SERVER_AGENDAS + '?fecha_resolucion=' + null);
  }

  modificarAgenda(agenda: IAgenda): Observable<IAgenda> {
    return this.http.put<IAgenda>(this.URL_SERVER_AGENDAS + '/' + agenda.id, agenda);
  }

  nuevoAgenda(agenda: IAgenda): Observable<IAgenda> {
    return this.http.post<IAgenda>(this.URL_SERVER_AGENDAS, agenda);
  }

  borrarAgenda(idAgenda: number) {
    return this.http.delete<IAgenda>(this.URL_SERVER_AGENDAS + '/' + idAgenda);
  }
}
