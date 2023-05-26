import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IAgenda} from "../interfaces/i-agenda";
import {Observable, of} from "rxjs";
import {CargaSeguimientoTeleoperadorService} from "./carga-seguimiento-teleoperador.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListaAgendasyAlarmasResueltasResolveService implements Resolve<IAgenda>{

  constructor(private cargarAgendas: CargaSeguimientoTeleoperadorService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgenda> {

    return this.cargarAgendas.getAgendasyAlarmasResueltas(route.params['id']).pipe(

      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
