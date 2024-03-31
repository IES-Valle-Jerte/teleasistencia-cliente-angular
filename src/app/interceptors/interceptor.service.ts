import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, of, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {catchError, finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import { Spinner } from '../servicios/Spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router, private spinner: Spinner) { }
  //metodo para el manejo de errores en las peticiones
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //Si las peticiones arrojan errores 401 unauthorized o 403 Prohibido muestro esa alerta
    if (err.status === 401 || err.status === 403) {
      Swal.fire( {
        icon:'error',
        title:'Error',
        text:'Error de acceso',
        footer:'Vuelve a iniciar sesión'
      })
      //limpio el localstorage y redirijo al login
      localStorage.clear();
      this.router.navigate(['/login']);
      return of(err.message);
    }
    //Si las peticiones arrojan errores 404 no encontrado
    if(err.status==404){
      Swal.fire( {
        icon:'error',
        title:'Error',
        text:'404 not found',
      })
      return of(err.message);
    }
    if(err.status==400){
      Swal.fire( {
        icon:'error',
        title:'Error',
        text:'Se ha producido un error',
      })
      return of(err.message);
    }
    return throwError(err);
  }
  //Interceptor obtiene la request de todas las peticiones http
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.mostrarSpiner();
    //obtengo el token del localstorage
    const token:string=localStorage.getItem('token')
    //Si el token existe clono la request y le añado la cabecera de authorizacion Bearer
    if(token){
      req=req.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      })
    }
    //retorno la peticion con el token en la cabecera y si hay un error muestro el metodo anterior
    return next.handle(req).pipe(
      catchError(x=> this.handleAuthError(x)),
      finalize(() => {
        this.spinner.ocultarSpinner();
      })
    );
  }
}
