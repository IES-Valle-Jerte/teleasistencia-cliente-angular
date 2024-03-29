import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {IAlarma} from "../../interfaces/i-alarma";
import {CargaAlarmaService} from "./carga-alarma.service";

@Injectable({
  providedIn: 'root'
})
export class ListaAlarmasUsuarioServicioResolveService implements Resolve<IAlarma> {

  constructor(private cargarAlarmas: CargaAlarmaService, private router: Router) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlarma> {
    return this.cargarAlarmas.getAlarmaPorPaciente(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }

}


