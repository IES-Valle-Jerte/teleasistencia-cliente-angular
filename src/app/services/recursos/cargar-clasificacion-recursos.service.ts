import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IClasificacioRecurso} from "../../interfaces/i-clasificacio-recurso";

@Injectable({
  providedIn: 'root'
})
export class CargarClasificacionRecursosService {
  public URL = environment.urlBase + 'clasificacion_recurso_comunitario';

  constructor(private http: HttpClient) { }

  getClasificacionRecursosComunitarios(): Observable<IClasificacioRecurso[]> {
    return this.http.get<IClasificacioRecurso[]>(this.URL);
  }

  getClasificacionRecursoComunitario(id: number): Observable<IClasificacioRecurso[]> {
    return this.http.get<IClasificacioRecurso[]>(this.URL+'/'+id);
  }
}
