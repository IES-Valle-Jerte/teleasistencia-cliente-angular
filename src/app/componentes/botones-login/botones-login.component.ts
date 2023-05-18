import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from "../../servicios/profile.service";
import {IProfileUser} from "../../interfaces/i-profile-user";
import {AuthService} from "../../servicios/auth.service";

@Component({
  selector: 'app-botones-login',
  templateUrl: './botones-login.component.html',
  styleUrls: ['./botones-login.component.scss']
})

export class BotonesLoginComponent implements OnInit, DoCheck {
  public estaLogin: boolean;
  public id:string
  public username:string
  public userlastname:string
  public img:string
  public imgNull:string

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }
// compruebo si esta login
// Obtengo el nombre de usuario del localStorage
// Obtengo la imagen del usuario y compruebo si es null o tiene imagen para mostrar una por defecto o la del usuario
  ngDoCheck(): void {
    this.estaLogin =this.auth.isLoggedIn();
    this.id=localStorage.getItem('id');
    this.username= localStorage.getItem('username');
    this.userlastname= localStorage.getItem('userlastname');
    const imagen=localStorage.getItem('img')
    if(imagen==='null'){
      this.imgNull=imagen
    }else{
      this.img= localStorage.getItem('img');
    }
  }

  hacerLogout(): void {
    this.auth.logout();
    this.router.navigate(['/inicio']);
  }
}
