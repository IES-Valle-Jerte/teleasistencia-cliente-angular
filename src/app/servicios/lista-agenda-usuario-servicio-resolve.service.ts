import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IAgenda} from "../interfaces/i-agenda";
import {CargaAgendaService} from "./carga-agenda.service";

@Injectable({
  providedIn: 'root'
})

export class ListaAgendaUsuarioServicioResolveService implements Resolve<IAgenda> {

  constructor(private cargaAgendaService: CargaAgendaService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgenda> {
    return this.cargaAgendaService.getAgendaPorIdPaciente(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
