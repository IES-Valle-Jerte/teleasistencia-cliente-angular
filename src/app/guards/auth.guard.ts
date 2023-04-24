import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../servicios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let url: string = state.url;
    const token = localStorage.getItem('token')

    if (!token) {
      this.router.navigate(['/login']);
      return false
    } else {
      return this.checkUserLogin(next, url);
    }

  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {

    if (this.authService.isLoggedIn()) {

      if (route.data.role != null) {
        const userRole = this.authService.getRole();
        console.log(userRole);
        console.log(route.data.role[0]);
        if (route.data.role[0].indexOf(userRole) == -1) {
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      } else {
        return true;
      }

    }

    this.router.navigate(['/inicio']);
    return false;
  }


}
