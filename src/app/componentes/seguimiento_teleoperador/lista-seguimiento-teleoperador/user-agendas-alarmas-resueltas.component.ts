import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IUserAlarmasAgendasResueltas} from "../../../interfaces/i-UserAlarmasAgendasResueltas";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';

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

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasV2Service,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.teleoperadores = this.route.snapshot.data['agendasyAlarmasResueltasTotales'];
    this.titleService.setTitle('Seguimiento Teleoperadores');
  }

  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var teleoperadores2 = this.ordTabla.ordenacionTabla(this.teleoperadores,indice,campo1,campo2, tipo);
    this.teleoperadores = [];
    this.cdr.detectChanges();
    this.teleoperadores = teleoperadores2;
    this.cdr.detectChanges();

  }
  // Esta función se ejecuta cada vez que cambia el valor del input de búsqueda
  onBusquedaChange() {
    // Cuando cambia el filtro, volvemos a la página 1
    this.numPaginacion = 1;
  }
}
