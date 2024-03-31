import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Alarma } from "../../../clases/alarma";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {AuthService} from "../../../servicios/auth.service";
import {CargaAlarmaService} from "../../../servicios/alarmas/carga-alarma.service";
import {IAlarma} from "../../../interfaces/i-alarma";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';
import { IPaciente } from 'src/app/interfaces/i-paciente';


@Component({
  selector: 'app-lista-alarmas',
  templateUrl: './lista-alarmas.component.html',
  styleUrls: ['./lista-alarmas.component.scss']
})
export class ListaAlarmasComponent implements OnInit {
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  isAdmin: boolean;
  public tituloAlarma: string;
  public fechaToday = new Date();
  public alarmasDelDia: IAlarma[] = [];
  public usuariosServicio: IPaciente[] = [];
  public inputFechaBusqueda: any = '';
  public busquedaUsuarioServicioId: number = null

  constructor(private route: ActivatedRoute,private auth:AuthService, private titleService: Title,private cargarAlarmas:CargaAlarmaService,
    private cdr: ChangeDetectorRef,
    private ordTabla: OrdenacionTablasV2Service,
    private router: Router) { }


  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.alarmasDelDia = this.route.snapshot.data['alarmas'].sort(this.ordenarAlarmas);
    this.usuariosServicio = this.route.snapshot.data['usuariosServicio'];
    var  busquedaUsuarioServicio = this.route.snapshot.data['busquedaUsuarioServicio'];
    if (busquedaUsuarioServicio){
      this.busquedaUsuarioServicioId = busquedaUsuarioServicio.id;
      this.tituloAlarma = "Alarmas de "+busquedaUsuarioServicio.id_persona.nombre + " "+ busquedaUsuarioServicio.id_persona.apellidos 
    }
    else{
      this.tituloAlarma = + this.fechaToday.getDate() + ' de ' + this.getNombreMes(this.fechaToday.getMonth()) + ' de '
        + this.fechaToday.getFullYear();
    }

    this.titleService.setTitle('Alarmas');

  }
  ordenarAlarmas(a: IAlarma, b:IAlarma):number{
    if(a.estado_alarma == "Abierta" && b.estado_alarma == "Cerrada"){
      return -1;
    }
    if(b.estado_alarma == "Abierta" && a.estado_alarma == "Cerrada"){
      return 1;
    }
    if(a.fecha_registro > b.fecha_registro){
      return 1;
    }
    if(a.fecha_registro < b.fecha_registro){
      return -1;
    }
  }

  
  // Método que ordena la tabla si hacemos click en las flechas de los th de la tabla
  
  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var alarmasDelDia2 = this.ordTabla.ordenacionTabla(this.alarmasDelDia,indice,campo1,campo2, tipo);
    this.alarmasDelDia = [];
    this.cdr.detectChanges();
    this.alarmasDelDia = alarmasDelDia2;
    this.cdr.detectChanges();

  }

  seleccionarFondo(alarma: Alarma): string {
    if (alarma.estado_alarma == "Cerrada") {
      return "cerrada"
    }
    return "abierta"

  }
  buscarPorFecha(event) {
    let fechaSeparada = event.split('-');

    if (event != undefined && event != ""){
      this.cargarAlarmas.getAlarmasPorFecha(event).subscribe(
        e => {
          const datos: any = e;
          this.inputFechaBusqueda = event;
          if (e) {
            this.alarmasDelDia = datos.sort(this.ordenarAlarmas);
            this.tituloAlarma = + fechaSeparada[2] + ' de '
              + this.getNombreMesActualizarFecha(fechaSeparada[1]) + ' de '
              + fechaSeparada[0];
            if(datos && datos.length > 0) {
              this.alarmasDelDia = this.alarmasDelDia.filter(el => {
                return el;
              });
            }
          }
          document.getElementById("campoBusqueda").focus();
        }
        );
    }
  }

  

  // Permite filtrar el contenido por usuario del servicio
  buscarPorUsuarioServicio(){
    //this.busquedaUsuarioServicio = event.value;
    if ( this.busquedaUsuarioServicioId){
      console.log(this.busquedaUsuarioServicioId);
      this.router.navigateByUrl('/alarmas/usuarios/actualizar/'+this.busquedaUsuarioServicioId, { skipLocationChange: true }).then(() => {
        this.router.navigate(['/alarmas/usuarios/'+this.busquedaUsuarioServicioId],{ replaceUrl: true });
      });
    }
    else {
      this.router.navigateByUrl('/alarmas/actualizar', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/alarmas']);
      });
    }

  }
  // Método para conseguir el nombre del mes usando el número que nos devuelve la función getMonth()
  getNombreMes (numMes: number) {
    let mes = '';
    switch (numMes) {
      case 0:
        mes = 'enero';
        break;
      case 1:
        mes = 'febrero';
        break;
      case 2:
        mes = 'marzo';
        break;
      case 3:
        mes = 'abril';
        break;
      case 4:
        mes = 'mayo';
        break;
      case 5:
        mes = 'junio';
        break;
      case 6:
        mes = 'julio';
        break;
      case 7:
        mes = 'agosto';
        break;
      case 8:
        mes = 'septiembre';
        break;
      case 9:
        mes = 'octubre';
        break;
      case 10:
        mes = 'noviembre';
        break;
      case 11:
        mes = 'diciembre';
        break;
    }
    return mes;
  }

  // Método para conseguir el nombre del mes usando el número que nos devuelve la función getMonth() pero con 0
  // al principio si es solo 1 digito y en string y empezando por 01 en vez de 0
  getNombreMesActualizarFecha (numMes: string) {
    let mes = '';
    switch (numMes) {
      case '01':
        mes = 'enero';
        break;
      case '02':
        mes = 'febrero';
        break;
      case '03':
        mes = 'marzo';
        break;
      case '04':
        mes = 'abril';
        break;
      case '05':
        mes = 'mayo';
        break;
      case '06':
        mes = 'junio';
        break;
      case '07':
        mes = 'julio';
        break;
      case '08':
        mes = 'agosto';
        break;
      case '09':
        mes = 'septiembre';
        break;
      case '10':
        mes = 'octubre';
        break;
      case '11':
        mes = 'noviembre';
        break;
      case '12':
        mes = 'diciembre';
        break;
    }
    return mes;
  }

}
