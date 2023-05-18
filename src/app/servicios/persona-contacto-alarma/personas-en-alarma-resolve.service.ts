import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {IPersonaContactoAlarma} from "../../interfaces/i-persona-contacto-alarma";
import {CargaPersonaContactoAlarmaService} from "./carga-persona-contacto-alarma.service";

@Injectable({
  providedIn: 'root'
})
export class PersonasEnAlarmaResolveService {

  constructor(private router:Router,private cargarPersonaAlarma: CargaPersonaContactoAlarmaService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersonaContactoAlarma[]> {
    return this.cargarPersonaAlarma.getPersonasEnAlarmaSegunId(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/alarmas']);
        return of(null)
      })
    );
  }
}
