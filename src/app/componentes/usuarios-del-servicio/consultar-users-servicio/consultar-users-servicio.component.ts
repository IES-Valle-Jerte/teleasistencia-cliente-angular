import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../servicios/auth.service";
import { OrdenacionTablasV2Service } from 'src/app/servicios/ordenacion-tablas.v2.service';

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
              private auth: AuthService,
              private ordTabla: OrdenacionTablasV2Service,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.usuarios = this.route.snapshot.data['usuarios_del_servicio']
    this.titleService.setTitle('Usuarios del Servicio');
    this.isAdmin = this.auth.isAdmin();
  }

  ordenacionTabla(indice: number,campo1:string = "", campo2:string = "" , tipo: string ="string"){
    var usuarios2 = this.ordTabla.ordenacionTabla(this.usuarios,indice,campo1,campo2, tipo);
    this.usuarios = [];
    this.cdr.detectChanges();
    this.usuarios = usuarios2;
    this.cdr.detectChanges();

  }
}