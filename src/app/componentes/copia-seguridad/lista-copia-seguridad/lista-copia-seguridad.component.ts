import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {ICopiaSeguridad} from "../../../interfaces/i-copia-seguridad";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-lista-copia-seguridad',
  templateUrl: './lista-copia-seguridad.component.html',
  styleUrls: ['./lista-copia-seguridad.component.scss']
})
export class ListaCopiaSeguridadComponent implements OnInit {
  public copias_seguridad: ICopiaSeguridad[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.copias_seguridad = this.route.snapshot.data['copia_seguridad'];
    this.titleService.setTitle('Gestion copia de seguridad.');
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
