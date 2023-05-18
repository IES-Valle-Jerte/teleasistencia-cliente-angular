import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;


  constructor() {
  }

  login(id,username, userlastname, role, img) {


    /***Apartado LocalStorage***/
    localStorage.setItem('id', id)
    localStorage.setItem('username', username);
    localStorage.setItem('userlastname', userlastname);
    localStorage.setItem('role', role);
    localStorage.setItem('img', img);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isLogin = false;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('img');
    localStorage.removeItem('username');
    localStorage.removeItem('userlastname');
    localStorage.removeItem('role');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin() {
    if (environment.admins.indexOf(localStorage.getItem('role')) != -1) {
      return true;
    }
    return false;
  }


}



