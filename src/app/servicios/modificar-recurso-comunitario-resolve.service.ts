import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IRecursoComunitario} from '../interfaces/i-recurso-comunitario';
import {CargaRecursoComunitarioService} from '../services/recursos/carga-recurso-comunitario.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificarRecursoComunitarioResolveService implements Resolve<IRecursoComunitario> {

  constructor(private cargaRecursoComunitario: CargaRecursoComunitarioService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecursoComunitario> {
    return this.cargaRecursoComunitario.getRecursoComunitario(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
