import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IPaciente} from "../../interfaces/i-paciente";

@Injectable({
  providedIn: 'root'
})
export class CargaPacienteService {
  private urlBase = environment.urlBase;
  private URL_SERVER_PACIENTE = this.urlBase + 'paciente';
  public pacienteId: number;

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<IPaciente[]> {
    return this.http.get<IPaciente[]>(this.URL_SERVER_PACIENTE);
  }

  getPaciente(idPaciente: number): Observable<IPaciente> {
    return this.http.get<IPaciente>(this.URL_SERVER_PACIENTE + '/' + idPaciente);
  }

  modificarPaciente(paciente: IPaciente): Observable<IPaciente> { //Modifico todo el paciente, pasandole eel objeto
    return this.http.put<IPaciente>(this.URL_SERVER_PACIENTE + '/' + paciente.id, paciente)
  }

  modificarNUSS(pacienteID : number, nuss: string): Observable<IPaciente> { //Recibe el id + el String y cambia el NUSS
    let numeroSS =
    {
      "numero_seguridad_social": nuss
    }
    return this.http.patch<IPaciente>(this.URL_SERVER_PACIENTE + '/' + pacienteID, numeroSS)
  }

  nuevoPaciente(paciente: IPaciente): Observable<IPaciente> {
    return this.http.post<IPaciente>(this.URL_SERVER_PACIENTE, paciente)
  }

  eliminarPaciente(paciente: IPaciente): Observable<IPaciente> {
    return this.http.delete<IPaciente>(this.URL_SERVER_PACIENTE +'/'+ paciente.id)
  }

}
