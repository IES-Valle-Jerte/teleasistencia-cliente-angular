
import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ILogin} from "../../interfaces/i-login";
import {Title} from "@angular/platform-browser";
import {Login} from "../../clases/login";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {token} from "../../interfaces/i-token";
import {NgForm} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ProfileService} from "../../servicios/profile.service";
import {IProfileUser} from "../../interfaces/i-profile-user";
import Swal from "sweetalert2";
import {AuthService} from "../../servicios/auth.service";



@Component({
  selector: 'app-pantalla-login',
  templateUrl: './pantalla-login.component.html',
  styleUrls: ['./pantalla-login.component.scss']
})
export class PantallaLoginComponent implements OnInit{
  public login: ILogin;
  public estaLogin: boolean;
  public id:number;
  public username:string;
  public userlastname:string;
  public grupo:string;

  public img:string


  @ViewChild('formLogin') formLogin!: NgForm
  private urltoken=environment.urlToken



  constructor(private titleService: Title,
              private http:HttpClient, private router: Router,private profileService:ProfileService,private auth:AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.login = new Login();
    this.estaLogin = this.auth.isLoggedIn();
  }

  //hago la peticion post de login añadiendo los datos del formulario
  //Si los datos son correctos solicito el token y lo grabo en localstorage
  hacerLogin(): void {
   this.http.post<token>(this.urltoken,
     this.formLogin.value
   ).subscribe(
      resp=>{
        localStorage.setItem('token',resp.access)
        // Hago la peticional profile y  alamceno en localstorage el nombre grupo e imagen
        this.profileService.getProfile()
          .subscribe((resp:IProfileUser[])=>{
            console.log(resp)
            this.id=resp[0].id
            this.username=resp[0].first_name
            this.userlastname=resp[0].last_name
            this.grupo=resp[0].groups[0].name
            console.log(this.grupo);
            if( resp[0].imagen == null){
              this.img=null
            } else{
              this.img=resp[0].imagen.imagen
            }

            this.auth.login(this.id,this.username,this.userlastname,this.grupo,this.img);
            //redirijimos al usuario al inicio
            this.router.navigate(['/inicio']);
          })

      }, err=>{
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Nombre de usuario o contraseña incorrectos',
       })
       return
     }
    )

  }


  hacerLogout(): void {
    this.auth.logout();
    this.estaLogin = this.auth.isLoggedIn();
    this.router.navigate(['/login']);
  }
  //variable necesaria para ocultar/mostrar la contraseña
  hide = false;



}
