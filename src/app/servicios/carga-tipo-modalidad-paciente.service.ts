import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITipoModalidadPaciente} from '../interfaces/i-tipo-modalidad-paciente';
import {CargaTipoCentroSanitarioService} from "./carga-tipo-centro-sanitario.service";
import {ICentroSanitario} from "../interfaces/i-centro-sanitario";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CargaTipoModalidadPacienteService {
  private urlBase = environment.urlBase;
  private URL_SERVER_TIPOS_MODALIDADES_PACIENTE = this.urlBase + 'tipo_modalidad_paciente';

  constructor(private http: HttpClient) {
  }

  getTiposModalidadesPacientes(): Observable<ITipoModalidadPaciente[]> {
    return this.http.get<ITipoModalidadPaciente[]>(this.URL_SERVER_TIPOS_MODALIDADES_PACIENTE);
  }

  getTipoModalidadPaciente(idTipoModalidadPaciente: number): Observable<ITipoModalidadPaciente> {
    return this.http.get<ITipoModalidadPaciente>(this.URL_SERVER_TIPOS_MODALIDADES_PACIENTE + '/' + idTipoModalidadPaciente);
  }

  modificarTipoModalidadPaciente(tipoModalidadPaciente: ITipoModalidadPaciente | any): Observable<ITipoModalidadPaciente> {
    return this.http.put<ITipoModalidadPaciente | any>(this.URL_SERVER_TIPOS_MODALIDADES_PACIENTE + '/' + tipoModalidadPaciente.id, tipoModalidadPaciente);
  }

  nuevoTipoModalidadPaciente(tipoModalidadPaciente: ITipoModalidadPaciente): Observable<ITipoModalidadPaciente> {
    return this.http.post<ITipoModalidadPaciente>(this.URL_SERVER_TIPOS_MODALIDADES_PACIENTE, tipoModalidadPaciente);
  }

  eliminarTipoModalidadPaciente(tipoModalidadPaciente: ITipoModalidadPaciente): Observable<ITipoModalidadPaciente> {
    return this.http.delete<ITipoModalidadPaciente>(this.URL_SERVER_TIPOS_MODALIDADES_PACIENTE + '/' + tipoModalidadPaciente);
  }
}
