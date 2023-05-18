import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IRelacionPacientePersona} from "../../interfaces/i-relacion-paciente-persona";

@Injectable({
  providedIn: 'root'
})
export class CargaRelacionPacientePersonaService {

  private urlBase = environment.urlBase;
  private URL_SERVER_RELACION_PACIENTE_PERSONA = this.urlBase + 'relacion_paciente_persona';

  constructor(private http: HttpClient) { }

  getRelacionesPacientePersona(): Observable<IRelacionPacientePersona[]> {
    return this.http.get<IRelacionPacientePersona[]>(this.URL_SERVER_RELACION_PACIENTE_PERSONA);
  }

  getRelacionPacientePersona(idRelacionPacientePersona: number): Observable<IRelacionPacientePersona> {
    return this.http.get<IRelacionPacientePersona>(this.URL_SERVER_RELACION_PACIENTE_PERSONA + '/' + idRelacionPacientePersona);
  }
  getRelacionPacientePersonaTerminal(idRelacionPacientePersona: number): Observable<IRelacionPacientePersona[]> {
    return this.http.get<IRelacionPacientePersona[]>(this.URL_SERVER_RELACION_PACIENTE_PERSONA + '?id_paciente__id_terminal=' + idRelacionPacientePersona);
  }

  modificarRelacionPacientePersona(relacionPacientePersona: IRelacionPacientePersona): Observable<IRelacionPacientePersona> {
    return this.http.put<IRelacionPacientePersona>(this.URL_SERVER_RELACION_PACIENTE_PERSONA + '/' + relacionPacientePersona.id, relacionPacientePersona)
  }

  nuevaRelacionPacientePersona(relacionPacientePersona: IRelacionPacientePersona): Observable<IRelacionPacientePersona> {
    return this.http.post<IRelacionPacientePersona>(this.URL_SERVER_RELACION_PACIENTE_PERSONA, relacionPacientePersona)
  }

  modificarRelacion(idRelacion:number, datos: any){
    return this.http.put<IRelacionPacientePersona>(this.URL_SERVER_RELACION_PACIENTE_PERSONA + '/' + idRelacion, datos)

  }



  eliminarRelacionPacientePersona(relacionPacientePersona: IRelacionPacientePersona): Observable<IRelacionPacientePersona> {
    return this.http.delete<IRelacionPacientePersona>(this.URL_SERVER_RELACION_PACIENTE_PERSONA +'/'+ relacionPacientePersona.id)
  }
}
