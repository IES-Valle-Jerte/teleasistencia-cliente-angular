import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {CargaTipoSituacionService} from "./carga-tipo-situacion.service";
import {Observable, of} from "rxjs";
import {ITipoVivienda} from "../interfaces/i-tipo-vivienda";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BorrarTipoSituacionService {

  constructor(private cargaSituacion: CargaTipoSituacionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoVivienda> {
    return this.cargaSituacion.getTiposSituaciones().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }

}
