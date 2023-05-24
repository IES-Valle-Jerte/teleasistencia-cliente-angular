import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../servicios/auth.service";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {Alarma} from "../../../clases/alarma";
import {IAgendas} from "../../../interfaces/i-agendas";
import {CargaAlarmaService} from "../../../servicios/alarmas/carga-alarma.service";
import {IAlarma} from "../../../interfaces/i-alarma";

@Component({
  selector: 'app-lista-alarmas-resueltas,[app-lista-alarmas-resueltas]',
  templateUrl: './lista-alarmas-resueltas.component.html',
  styleUrls: ['./lista-alarmas-resueltas.component.scss']
})
export class ListaAlarmasResueltasComponent implements OnInit {
  public agendas:IAgendas[];
  private idTeleoperador: any;
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  private agendasResueltas: any;
  public alarmas: any;
  peticion: any;
  public inputFechaBusqueda: any = '';
  public alarmasDelDia: IAlarma[] = [];
  public fecha: string;

  constructor(private cargarAlarmas:CargaAlarmaService,private route: ActivatedRoute,private auth:AuthService, private ordTabla: OrdenacionTablasService, private titleService: Title) { }

  ngOnInit(): void {

    this.agendasResueltas=this.route.snapshot.data['lista_agenda_resuelta'];
    this.agendas=this.agendasResueltas.agendas;
    this.alarmas=this.agendasResueltas.alarmas
    this.peticion=this.agendasResueltas;
    this.idTeleoperador = this.route.snapshot.params['id'];

    console.log(this.peticion);

    this.titleService.setTitle(' Alarmas Resueltas del teleoperador con Id: ' + this.idTeleoperador);

  }
  ordenacionTablas(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }

  seleccionarFondo(alarma: Alarma): string {
    if (alarma.estado_alarma == "Cerrada") {
      return "cerrada"
    }
    return "abierta"

  }
  ordenarAlarmas(a: IAlarma, b:IAlarma):number{
    console.log("abierta"+a.estado_alarma)
    console.log("cerrada"+b.estado_alarma)
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
  // buscarPorFecha(event) {
  //   let fechaSeparada = event.split('-');
  //
  //   this.cargarAlarmas.getAlarmasPorFecha(event).subscribe(
  //     e => {
  //       const datos: any = e;
  //       this.inputFechaBusqueda = event;
  //       if (e) {
  //         this.alarmasDelDia = datos.sort(this.ordenarAlarmas);
  //         this.fecha = +fechaSeparada[2] + ' de '
  //           + this.getNombreMesActualizarFecha(fechaSeparada[1]) + ' de '
  //           + fechaSeparada[0];
  //         if (datos && datos.length > 0) {
  //           this.alarmasDelDia = this.alarmasDelDia.filter(el => {
  //             return el;
  //           });
  //         }
  //       }
  //       document.getElementById("campoBusqueda").focus();
  //     });
  // }
  // // Método para conseguir el nombre del mes usando el número que nos devuelve la función getMonth() pero con 0
  // // al principio si es solo 1 digito y en string y empezando por 01 en vez de 0
  // getNombreMesActualizarFecha (numMes: string) {
  //   let mes = '';
  //   switch (numMes) {
  //     case '01':
  //       mes = 'enero';
  //       break;
  //     case '02':
  //       mes = 'febrero';
  //       break;
  //     case '03':
  //       mes = 'marzo';
  //       break;
  //     case '04':
  //       mes = 'abril';
  //       break;
  //     case '05':
  //       mes = 'mayo';
  //       break;
  //     case '06':
  //       mes = 'junio';
  //       break;
  //     case '07':
  //       mes = 'julio';
  //       break;
  //     case '08':
  //       mes = 'agosto';
  //       break;
  //     case '09':
  //       mes = 'septiembre';
  //       break;
  //     case '10':
  //       mes = 'octubre';
  //       break;
  //     case '11':
  //       mes = 'noviembre';
  //       break;
  //     case '12':
  //       mes = 'diciembre';
  //       break;
  //   }
  //   return mes;
  // }
}
