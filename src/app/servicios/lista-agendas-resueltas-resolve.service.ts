import { Injectable } from '@angular/core';
import {CargaUserService} from "./carga-user.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IAgenda} from "../interfaces/i-agenda";
import {Observable, of} from "rxjs";
import {CargarAgendasResueltasService} from "./cargar-agendas-resueltas.service";
import {CargaSeguimientoTeleoperadorService} from "./carga-seguimiento-teleoperador.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListaAgendasResueltasResolveService implements Resolve<IAgenda>{

  constructor(private cargarAgendas: CargaSeguimientoTeleoperadorService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgenda> {

    return this.cargarAgendas.getAgendasResueltas(route.params['id']).pipe(

      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
