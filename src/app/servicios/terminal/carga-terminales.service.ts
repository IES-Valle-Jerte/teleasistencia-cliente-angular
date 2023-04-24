import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ITerminal} from "../../interfaces/i-terminal";


@Injectable({
  providedIn: 'root'
})
export class CargaTerminalesService {
  private urlBase = environment.urlBase;
  private  URL_SERVER_TERMINAL = this.urlBase + 'terminal';
  constructor(private http:HttpClient) { }

    getTerminales(): Observable<ITerminal[]> {
      return this.http.get<ITerminal[]>(this.URL_SERVER_TERMINAL);
    }
    getTerminal(idTerminal: number): Observable<ITerminal> {
      return this.http.get<ITerminal>(this.URL_SERVER_TERMINAL + '/' + idTerminal)
    }
    modificarTerminal(terminal: ITerminal): Observable<ITerminal> {
      return this.http.put<ITerminal>(this.URL_SERVER_TERMINAL + '/' + terminal.id, terminal)
    }
    nuevoTerminal(terminal: ITerminal): Observable<ITerminal> {
      return this.http.post<ITerminal>(this.URL_SERVER_TERMINAL, terminal)
    }
    eliminarTerminal(terminal: ITerminal): Observable<ITerminal> {
      return this.http.delete<ITerminal>(this.URL_SERVER_TERMINAL + '/' + terminal.id)
  }

 }
