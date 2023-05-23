import {Injectable} from '@angular/core';
import {CargaTipoAlarmaService} from "../carga-tipo-alarma.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ITipoAlarma} from "../../interfaces/i-tipo-alarma";
import {catchError} from "rxjs/operators";
import {CargaUsuariosDelServicioService} from "./carga-usuarios-del-servicio.service";

@Injectable({
  providedIn: 'root'
})
export class CargaUsuariosDelServicioResolveService {

  constructor(private cargaUsuarios: CargaUsuariosDelServicioService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.cargaUsuarios.getUsuarios().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
