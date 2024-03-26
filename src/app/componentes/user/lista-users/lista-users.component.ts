import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IUsers} from '../../../interfaces/i-users';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {environment} from "../../../../environments/environment";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';

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

  constructor(private route: ActivatedRoute, private titleService: Title,
    private ordTabla: OrdenacionTablasV2Service,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];

    this.titleService.setTitle('Usuarios del sistema');
  }



  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var users2 = this.ordTabla.ordenacionTabla(this.users,indice,campo1,campo2, tipo);
    this.users = [];
    this.cdr.detectChanges();
    this.users = users2;
    this.cdr.detectChanges();

  }
}
