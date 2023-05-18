import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IPersonaContactoAlarma} from "../../interfaces/i-persona-contacto-alarma";


@Injectable({
  providedIn: 'root'
})
export class CargaPersonaContactoAlarmaService {
  private urlBase = environment.urlBase;
  private URL_SERVER_PERSONA_CONTACTO_ALARMA = this.urlBase + 'persona_contacto_en_alarma';
  constructor(private http: HttpClient) { }

  getPersonasContactoAlarma(): Observable<IPersonaContactoAlarma[]> {
    return this.http.get<IPersonaContactoAlarma[]>(this.URL_SERVER_PERSONA_CONTACTO_ALARMA);
  }

  getPersonaContactoAlarma(idPersonaContactoAlarma: number): Observable<IPersonaContactoAlarma> {
    return this.http.get<IPersonaContactoAlarma>(this.URL_SERVER_PERSONA_CONTACTO_ALARMA+ '/' + idPersonaContactoAlarma);
  }
  getPersonasEnAlarmaSegunId(idPersonaContactoAlarma: number): Observable<IPersonaContactoAlarma[]> {
    return this.http.get<IPersonaContactoAlarma[]>(this.URL_SERVER_PERSONA_CONTACTO_ALARMA+ '?id_alarma=' + idPersonaContactoAlarma);
  }

  modificarPersonaContactoAlarma(personaContactoAlarma: IPersonaContactoAlarma): Observable<IPersonaContactoAlarma> {
    return this.http.put<IPersonaContactoAlarma>(this.URL_SERVER_PERSONA_CONTACTO_ALARMA+ '/' + personaContactoAlarma.id, personaContactoAlarma);
  }

  nuevaPersonaContactoAlarma(personaContactoAlarma: any): Observable<IPersonaContactoAlarma> {
    return this.http.post<IPersonaContactoAlarma> (this.URL_SERVER_PERSONA_CONTACTO_ALARMA, personaContactoAlarma);
  }

  eliminarPersonaContactoAlarma(personaContactoAlarma: IPersonaContactoAlarma): Observable<IPersonaContactoAlarma> {
    return this.http.delete<IPersonaContactoAlarma> (this.URL_SERVER_PERSONA_CONTACTO_ALARMA +'/'+ personaContactoAlarma.id);
  }

}
