import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {IAlarma} from "../../interfaces/i-alarma";
import {CargaAlarmaService} from "./carga-alarma.service";
import {IAgenda} from "../../interfaces/i-agenda";

@Injectable({
  providedIn: 'root'
})
export class ListaAlarmasResolveService implements Resolve<IAlarma> {

  constructor(private cargarAlarmas: CargaAlarmaService, private router: Router) { }

  fechaPrevista = new Date();

  fechaParseada =  this.fechaPrevista.getFullYear() +'-'+ (this.fechaPrevista.getMonth()+1) +'-'+ this.fechaPrevista.getDate();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlarma> {
    return this.cargarAlarmas.getAlarmasPorFecha(this.fechaParseada).pipe(take(1)).pipe(
      map(datos => {
        return datos;
      })
    )
}

}
