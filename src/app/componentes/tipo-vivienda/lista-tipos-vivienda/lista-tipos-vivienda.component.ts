import { Component, OnInit } from '@angular/core';
import {ITipoVivienda} from "../../../interfaces/i-tipo-vivienda";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-lista-tipos-vivienda',
  templateUrl: './lista-tipos-vivienda.component.html',
  styleUrls: ['./lista-tipos-vivienda.component.scss']
})
export class ListaTiposViviendaComponent implements OnInit {
  public tipos_viviendas: ITipoVivienda[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.tipos_viviendas = this.route.snapshot.data['tipos_viviendas'];
    this.titleService.setTitle('Tipos viviendas');
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
