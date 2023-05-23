import {Component, DoCheck, OnInit,} from '@angular/core';
import {environment} from "../../../environments/environment";
import {CargaAlarmaService} from "../../servicios/alarmas/carga-alarma.service";
import {Router} from "@angular/router";
import {ProfileService} from "../../servicios/profile.service";
import {IClasificacioRecurso} from "../../interfaces/i-clasificacio-recurso";
import {CargarClasificacionRecursosService} from "../../services/recursos/cargar-clasificacion-recursos.service";
import {AuthService} from "../../servicios/auth.service";
import {ConexionWsService} from "../../servicios/websocket/conexion-ws.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public isLoggedIn: boolean
  public teleoperador: number
  public clasificacionRecursos: IClasificacioRecurso[] | []; // Esta variable la utilizaremos para obtener la clasificacion de recursos que mostraremos en el apartado de Recursos

  public cookiesAceptadas: string;

  isAdmin: boolean;

  subdominioNombre = environment.subdominio.nombre;
  subdominioColor = environment.subdominio.color;

  constructor(private auth: AuthService, private profileService: ProfileService,private conexionWS: ConexionWsService,
              private cargarAlarma: CargaAlarmaService, private router: Router,private cargarClasificacion: CargarClasificacionRecursosService,) {
  }

  ngOnInit(): void {
    //comprobamos si hay usuario logeado
    if (this.auth.isLoggedIn()) {
      this.conexionWS.conectar();
      this.cargar_clasificacion();

      // Utilizamos un GET para cargar la clasificacion de los recursos
      this.cargarClasificacion.getClasificacionRecursosComunitarios().subscribe(
        listaClasificacion => {
          this.clasificacionRecursos = listaClasificacion;
        },
        error => console.log(error),
      )
    }
    this.cookiesAceptadas=localStorage.getItem('cookies');
    //localStorage.removeItem('cookies'); esto resetearia las cookies
  }
  //Compruebo si esta login para ocultar el navbar

  ngDoCheck():void {
      let lastisLoggedIn = this.isLoggedIn;
      this.isLoggedIn = this.auth.isLoggedIn();
      this.isAdmin = this.auth.isAdmin();
      if (!lastisLoggedIn && this.isLoggedIn){
        this.cargar_clasificacion();
      }
  }


  cargar_clasificacion (): void{
    // Utilizamos un GET para cargar la clasificacion de los recursos
    this.cargarClasificacion.getClasificacionRecursosComunitarios().subscribe(
      listaClasificacion => {
        this.clasificacionRecursos = listaClasificacion;
      },
      error => console.log(error),
      () => console.log('Fin de observable')
    )}


  aceptarCookies(): void{
    localStorage.setItem('cookies','accept');
    window.location.reload()
  }

}
