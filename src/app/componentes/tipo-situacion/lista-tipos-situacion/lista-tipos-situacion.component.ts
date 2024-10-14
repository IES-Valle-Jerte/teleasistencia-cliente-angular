import { Component, OnInit } from '@angular/core';
import {ITipoSituacion} from "../../../interfaces/i-tipo-situacion";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-lista-tipos-situacion',
  templateUrl: './lista-tipos-situacion.component.html',
  styleUrls: ['./lista-tipos-situacion.component.scss']
})
export class ListaTiposSituacionComponent implements OnInit {
  public tipos_situaciones: ITipoSituacion[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.tipos_situaciones = this.route.snapshot.data['tipos_situaciones'];
    this.titleService.setTitle('Tipos situaciones de pacientes');
  }

  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
  // Esta función se ejecuta cada vez que cambia el valor del input de búsqueda
  onBusquedaChange() {
    // Cuando cambia el filtro, volvemos a la página 1
    this.numPaginacion = 1;
  }

}
