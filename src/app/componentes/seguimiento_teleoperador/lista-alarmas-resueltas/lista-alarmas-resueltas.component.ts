import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../servicios/auth.service";
import {Alarma} from "../../../clases/alarma";
import {CargaAlarmaService} from "../../../servicios/alarmas/carga-alarma.service";
import {IAlarma} from "../../../interfaces/i-alarma";
import {IAgenda} from "../../../interfaces/i-agenda";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';

@Component({
  selector: 'app-lista-alarmas-resueltas,[app-lista-alarmas-resueltas]',
  templateUrl: './lista-alarmas-resueltas.component.html',
  styleUrls: ['./lista-alarmas-resueltas.component.scss']
})
export class ListaAlarmasResueltasComponent implements OnInit {
  public agendas:IAgenda[];
  private idTeleoperador: any;
  numPaginacion: number = 1;
  numPaginacion2: number = 1;
  inputBusqueda: any = '';
  private agendasResueltas: any;
  public alarmas: any;
  peticion: any;
  public inputFechaBusqueda: any = '';
  public alarmasDelDia: IAlarma[] = [];
  public fecha: string;

  constructor(private cargarAlarmas:CargaAlarmaService,private route: ActivatedRoute,private auth:AuthService, private ordTabla: OrdenacionTablasV2Service, private titleService: Title,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.agendasResueltas=this.route.snapshot.data['lista_agendas_y_alarmas_resuelta'];
    this.agendas=this.agendasResueltas.agendas;
    this.alarmas=this.agendasResueltas.alarmas;
    this.peticion=this.agendasResueltas;
    this.idTeleoperador = this.route.snapshot.params['id'];



    this.titleService.setTitle(' Alarmas Resueltas del teleoperador con Id: ' + this.idTeleoperador);

  }
  
  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var agendas2 = this.ordTabla.ordenacionTabla(this.agendas,indice,campo1,campo2, tipo);
    this.agendas = [];
    this.cdr.detectChanges();
    this.agendas = agendas2;
    this.cdr.detectChanges();

  }
  
  ordenacionTabla2(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var alarmas2 = this.ordTabla.ordenacionTabla(this.alarmas,indice,campo1,campo2, tipo);
    this.alarmas = [];
    this.cdr.detectChanges();
    this.alarmas = alarmas2;
    this.cdr.detectChanges();

  }

  seleccionarFondo(alarma: Alarma): string {
    if (alarma.estado_alarma == "Cerrada") {
      return "cerrada"
    }
    return "abierta"

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

}
