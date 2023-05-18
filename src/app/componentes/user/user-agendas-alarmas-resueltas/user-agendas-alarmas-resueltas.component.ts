import {Component, OnInit} from '@angular/core';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {IUsers} from "../../../interfaces/i-users";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-agendas-alarmas-resueltas',
  templateUrl: './user-agendas-alarmas-resueltas.component.html',
  styleUrls: ['./user-agendas-alarmas-resueltas.component.scss']
})
export class UserAgendasAlarmasResueltasComponent implements OnInit {
  public users: IUsers[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    this.titleService.setTitle('Usuarios del sistema');
  }

  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
}
