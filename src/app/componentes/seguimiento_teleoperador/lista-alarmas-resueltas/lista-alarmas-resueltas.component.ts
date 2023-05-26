import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../servicios/auth.service";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {Alarma} from "../../../clases/alarma";
import {ISeguimiento_teleoperador} from "../../../interfaces/i-seguimiento_teleoperador";
import {CargaAlarmaService} from "../../../servicios/alarmas/carga-alarma.service";
import {IAlarma} from "../../../interfaces/i-alarma";

@Component({
  selector: 'app-lista-alarmas-resueltas,[app-lista-alarmas-resueltas]',
  templateUrl: './lista-alarmas-resueltas.component.html',
  styleUrls: ['./lista-alarmas-resueltas.component.scss']
})
export class ListaAlarmasResueltasComponent implements OnInit {
  public agendas:ISeguimiento_teleoperador[];
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
    this.alarmas=this.agendasResueltas.alarmas;
    this.peticion=this.agendasResueltas;
    this.idTeleoperador = this.route.snapshot.params['id'];



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

}
