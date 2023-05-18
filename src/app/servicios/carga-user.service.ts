import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUsers} from '../interfaces/i-users';
import {IDireccion} from "../interfaces/i-direccion";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CargaUserService {
  private urlBase = environment.urlBase;
  private URL_SERVER_USERS = this.urlBase + 'users';
  private url_SERVER_PROFILES = this.urlBase + 'profile';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.URL_SERVER_USERS);
  }

  getUser(idUser: number): Observable<IUsers> {
    return this.http.get<IUsers>(this.URL_SERVER_USERS + '/' + idUser);
  }

  modificarUser(user: FormData, id: number): Observable<IUsers> {
    //return this.http.put<IUsers>(user.url, user);
    return this.http.put<IUsers>(this.URL_SERVER_USERS +'/' + id, user);
  }

  modificarProfile(user: FormData, id: number): Observable<IUsers> {
    return this.http.patch<IUsers>(this.url_SERVER_PROFILES +'/' + id, user);
  }

  nuevoUser(user: FormData): Observable<IUsers> {
    return this.http.post<IUsers>(this.URL_SERVER_USERS, user);
  }
  eliminarUsuario(user:IUsers): Observable<IUsers> {
    return this.http.delete<IUsers>(this.URL_SERVER_USERS+ '/' + user.id);
  }
}
