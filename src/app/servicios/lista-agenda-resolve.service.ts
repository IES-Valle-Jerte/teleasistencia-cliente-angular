import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IAgenda} from "../interfaces/i-agenda";
import {CargaAgendaService} from "./carga-agenda.service";

@Injectable({
  providedIn: 'root'
})

export class ListaAgendaResolveService implements Resolve<IAgenda> {

  constructor(private cargaAgendaService: CargaAgendaService, private router: Router) {
  }
  fechaPrevista = new Date().toISOString().slice(0, 10);

  //fechaParseada =  this.fechaPrevista.getFullYear() +'-'+ (this.fechaPrevista.getMonth()+1) +'-'+ this.fechaPrevista.getDate();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgenda> {
    return this.cargaAgendaService.getAgendasPorFechaPrevista(this.fechaPrevista).pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
