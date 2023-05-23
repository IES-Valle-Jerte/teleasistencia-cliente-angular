import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-consultar-users-servicio',
  templateUrl: './consultar-users-servicio.component.html',
  styleUrls: ['./consultar-users-servicio.component.scss']
})
export class ConsultarUsersServicioComponent implements OnInit {

  public usuarios: any[]
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  isAdmin: boolean;


  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private ordTabla: OrdenacionTablasService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.usuarios = this.route.snapshot.data['usuarios_del_servicio']
    this.titleService.setTitle('Usuarios del Servicio');
    this.isAdmin = this.auth.isAdmin();
  }

  ordenacionTabla(indice: number, tipo: string) {
    this.ordTabla.ordenacionService(indice, tipo);
  }

}
