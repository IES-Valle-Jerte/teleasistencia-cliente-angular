import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IAlarma} from "../../../interfaces/i-alarma";
import {AuthService} from "../../../servicios/auth.service";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {Alarma} from "../../../clases/alarma";
import {IAgenda} from "../../../interfaces/i-agenda";
import {IAgendas} from "../../../interfaces/i-agendas";

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

  constructor(private route: ActivatedRoute,private auth:AuthService, private ordTabla: OrdenacionTablasService, private titleService: Title) { }

  ngOnInit(): void {

    this.agendasResueltas=this.route.snapshot.data['lista_agenda_resuelta'];
    this.agendas=this.agendasResueltas.agendas;
    this.alarmas=this.agendasResueltas.alarmas
    this.peticion=this.agendasResueltas;
    this.idTeleoperador = this.route.snapshot.params['id'];

    console.log(this.peticion);

    this.titleService.setTitle(' Alarmas Resueltas del teleoperador con Id: ' + this.idTeleoperador);

  }
  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }


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
