import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ITipoVivienda} from "../interfaces/i-tipo-vivienda";
import {catchError} from "rxjs/operators";
import {CargaViviendaService} from "./carga-vivienda.service";

@Injectable({
  providedIn: 'root'
})
export class BorrarTipoViviendaService implements Resolve<ITipoVivienda>{

  constructor(private cargaViviendas: CargaViviendaService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoVivienda> {
    return this.cargaViviendas.getViviendas().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
