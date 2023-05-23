import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAgenda} from "../../interfaces/i-agenda";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CargaUsuariosDelServicioService {
  private urlBase = environment.urlBase;
  private URL_SERVER_USER_SERVICE = this.urlBase + 'paciente';

  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_SERVER_USER_SERVICE);
  }

  getUsuario(idAgenda: number): Observable<IAgenda> {
    return this.http.get<any>(this.URL_SERVER_USER_SERVICE + '/' + idAgenda);
  }

  modificarUsuario(usuario: any): Observable<any> {
    return this.http.put<any>(this.URL_SERVER_USER_SERVICE + '/' + usuario.id, usuario);
  }

  nuevoUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.URL_SERVER_USER_SERVICE, usuario);
  }

  delUsuario(idUser: number) {
    return this.http.delete<any>(this.URL_SERVER_USER_SERVICE + '/' + idUser);
  }
}
