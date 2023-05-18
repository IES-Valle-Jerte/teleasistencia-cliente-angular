import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {
  CargaRecursosComunitariosAlarmaService
} from "../recursos-comunitarios-alarma/carga-recursos-comunitarios-alarma.service";
import {IClasificacioRecurso} from "../../interfaces/i-clasificacio-recurso";

@Injectable({
  providedIn: 'root'
})
export class ClasificacionRecursoscomunitariosResolveService implements Resolve<IClasificacioRecurso>{

  constructor(private cargarRecursos: CargaRecursosComunitariosAlarmaService,private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClasificacioRecurso> {
    return this.cargarRecursos.tiposRecursosComunitarios().pipe(
      catchError(error => {
        this.router.navigate(['/alarmas']);
        return of(null)
      })
    );
  }
}
