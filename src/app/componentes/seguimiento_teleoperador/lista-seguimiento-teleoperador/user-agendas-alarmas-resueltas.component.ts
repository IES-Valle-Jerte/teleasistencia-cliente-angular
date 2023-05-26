import {Component, OnInit} from '@angular/core';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IUserAlarmasAgendasResueltas} from "../../../interfaces/i-UserAlarmasAgendasResueltas";

@Component({
  selector: 'app-lista-seguimiento-teleoperador',
  templateUrl: './user-agendas-alarmas-resueltas.component.html',
  styleUrls: ['./user-agendas-alarmas-resueltas.component.scss']
})
export class UserAgendasAlarmasResueltasComponent implements OnInit {
  public teleoperadores: IUserAlarmasAgendasResueltas[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.teleoperadores = this.route.snapshot.data['agendasyAlarmasResueltasTotales'];
    this.titleService.setTitle('Seguimiento Teleoperadores');
  }

  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
}
