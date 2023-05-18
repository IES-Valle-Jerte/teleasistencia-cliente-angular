import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {IRecursosComunitariosAlarma} from "../../interfaces/i-recursos-comunitarios-alarma";
import {CargaRecursosComunitariosAlarmaService} from "./carga-recursos-comunitarios-alarma.service";

@Injectable({
  providedIn: 'root'
})
export class RecursosEnAlarmaResolveService {

  constructor(private router:Router,private cargarRecursosAlarma:CargaRecursosComunitariosAlarmaService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecursosComunitariosAlarma[]> {
    return this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/alarmas']);
        return of(null)
      })
    );
  }
}
