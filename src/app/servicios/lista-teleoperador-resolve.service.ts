import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CargaSeguimientoTeleoperadorService} from "./carga-seguimiento-teleoperador.service";
import {IUserAlarmasAgendasResueltas} from "../interfaces/i-UserAlarmasAgendasResueltas";

@Injectable({
  providedIn: 'root'
})
export class ListaTeleoperadorResolveService implements Resolve<IUserAlarmasAgendasResueltas>{

  constructor(private cargaTeleoperador: CargaSeguimientoTeleoperadorService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserAlarmasAgendasResueltas> {
    return this.cargaTeleoperador.getTeleoperadores().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
