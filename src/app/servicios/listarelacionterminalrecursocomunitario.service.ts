import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IRecursoComunitario} from "../interfaces/i-recurso-comunitario";
import {CargaRecursoComunitarioService} from "../services/recursos/carga-recurso-comunitario.service";

@Injectable({
  providedIn: 'root'
})

export class ListarelacionterminalrecursocomunitarioService implements Resolve<IRecursoComunitario> {

  constructor(private cargaRecursoComunitario: CargaRecursoComunitarioService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecursoComunitario> {
    return this.cargaRecursoComunitario.getDatosSanitario(1).pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
