import {Component, OnInit} from '@angular/core';
import {IUsers} from '../../../interfaces/i-users';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.scss']
})

export class ListaUsersComponent implements OnInit {
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
