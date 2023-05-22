import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CargaSeguimientoTeleoperadorService} from "./carga-seguimiento-teleoperador.service";
import {ITeleoperador} from "../interfaces/i-teleoperador";

@Injectable({
  providedIn: 'root'
})
export class ListaTeleoperadorResolveService implements Resolve<ITeleoperador>{

  constructor(private cargaTeleoperador: CargaSeguimientoTeleoperadorService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeleoperador> {
    return this.cargaTeleoperador.getTeleoperadores().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
