import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {IAgenda} from "../../../interfaces/i-agenda";
import {AuthService} from "../../../servicios/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';
import { IPaciente } from 'src/app/interfaces/i-paciente';

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  public agendasDelDia: IAgenda[] = [];
  public usuariosServicio: IPaciente[] = [];
  public busquedaUsuarioServicioId: Number = null;
  public fechaToday = new Date();
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  inputFechaBusqueda: any = '';
  public tituloAgenda = '';
  public isAdmin: boolean


  constructor(
    private cargaAgendaService: CargaAgendaService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private ordTabla: OrdenacionTablasV2Service,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  // Al cargar el componente, se establecen las agendas para el día actual
  ngOnInit() {
    this.agendasDelDia = this.route.snapshot.data['agendasDelDia'];
    this.usuariosServicio = this.route.snapshot.data['usuariosServicio'];
    var  busquedaUsuarioServicio = this.route.snapshot.data['busquedaUsuarioServicio'];
    if (busquedaUsuarioServicio){
      this.busquedaUsuarioServicioId = busquedaUsuarioServicio.id;
      this.tituloAgenda = "Agenda de "+busquedaUsuarioServicio.id_persona.nombre + " "+ busquedaUsuarioServicio.id_persona.apellidos 
    }
    else{
      this.tituloAgenda = +this.fechaToday.getDate() + ' de ' + this.getNombreMes(this.fechaToday.getMonth()) + ' de '
        + this.fechaToday.getFullYear();
    }
    this.agendasDelDia = this.agendasDelDia.sort(this.ordenarAgendas);
    this.isAdmin = this.auth.isAdmin();
  }

  ordenarAgendas(a: IAgenda, b: IAgenda): number {
    if (a.id_tipo_agenda == null) {
      return -1;
    }
    if (b.id_tipo_agenda == null) {
      return 1;
    }
    if ((a.fecha_resolucion != null && b.fecha_resolucion === null)) {
      return 1;
    }
    if (a.fecha_resolucion === null && b.fecha_resolucion != null) {
      return -1;
    }
    if (a.id_tipo_agenda.importancia > b.id_tipo_agenda.importancia) {
      return 1;
    } else {
      if (a.id_tipo_agenda.importancia == b.id_tipo_agenda.importancia) {
        if (a.fecha_prevista > b.fecha_prevista) {
          return 1;
        }
      }
    }
    return -1;
  }

  // Método que ordena la tabla si hacemos click en las flechas de los th de la tabla
  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var agendasDelDia2 = this.ordTabla.ordenacionTabla(this.agendasDelDia,indice,campo1,campo2, tipo);
    this.agendasDelDia = [];
    this.cdr.detectChanges();
    this.agendasDelDia = agendasDelDia2;
    this.cdr.detectChanges();

  }
  

  // Método para buscar las agendas según un día seleccionado
  // El funcionamiento del mismo es el siguiente:
  // 1. Se realiza la petición para cargar las agendas según la fecha que se ha seleccionado
  // 2. Si hay datos, se actualiza el array "agendasDelDía" y se cambia el string que muestra el día actual
  // 3. Devuelve los datos actualizados y muestra las agendas para la fecha que se ha buscado.
  // 4. Al final se hace un .focus() sobre un div con style "display: none" para quitar el foco del input de fecha.
  buscarPorFecha(event) {
    let fechaSeparada = event.split('-');
    this.cargaAgendaService.getAgendasPorFechaPrevista(event).subscribe(
      e => {
        const datos: any = e;
        this.inputFechaBusqueda = event;
        if (e) {
          this.agendasDelDia = datos;
          this.tituloAgenda = +fechaSeparada[2] + ' de '
            + this.getNombreMesActualizarFecha(fechaSeparada[1]) + ' de '
            + fechaSeparada[0];
          if (datos && datos.length > 0) {
            this.agendasDelDia = this.agendasDelDia.filter(el => {
              return el;
            });
          }
        }
        document.getElementById("campoBusqueda").focus();
        this.agendasDelDia.sort(this.ordenarAgendas);
      },
      error => {
        console.log(error);
      }
    );
  }

  // Permite filtrar el contenido por usuario del servicio
  buscarPorUsuarioServicio(){
    //this.busquedaUsuarioServicio = event.value;
    if ( this.busquedaUsuarioServicioId){
      this.router.navigateByUrl('/agenda/usuarios/actualizar/'+this.busquedaUsuarioServicioId, { skipLocationChange: true }).then(() => {
        this.router.navigate(['/agenda/usuarios/'+this.busquedaUsuarioServicioId],{ replaceUrl: true });
      });
    }
    else {
      this.router.navigateByUrl('/agenda/actualizar', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/agenda']);
      });
    }

  }

  // Método para conseguir el nombre del mes usando el número que nos devuelve la función getMonth()
  getNombreMes(numMes: number) {
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
  getNombreMesActualizarFecha(numMes: string) {
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
