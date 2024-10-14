import { Component, OnInit } from '@angular/core';
import {IHistoricoTipoSituacion} from "../../../interfaces/i-historico-tipo-situacion";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-historico-tipo-situacion',
  templateUrl: './historico-tipo-situacion.component.html',
  styleUrls: ['./historico-tipo-situacion.component.scss']
})
export class HistoricoTipoSituacionComponent implements OnInit {

  public historicos_tipos_situacion: IHistoricoTipoSituacion[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  // Carga de datos para mostrarlos en la tabla.
  ngOnInit(): void {
    this.historicos_tipos_situacion = this.route.snapshot.data['historicos_situaciones'];
    this.titleService.setTitle('Histórico tipos situacion');
  }

  // Método que ordena la tabla al hacer click en los th de la tabla.
  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
  // Esta función se ejecuta cada vez que cambia el valor del input de búsqueda
  onBusquedaChange() {
    // Cuando cambia el filtro, volvemos a la página 1
    this.numPaginacion = 1;
  }

}
