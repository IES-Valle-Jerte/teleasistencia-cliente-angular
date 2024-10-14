import {Component, OnInit} from '@angular/core';
import {ICentroSanitario} from '../../../interfaces/i-centro-sanitario';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-lista-centros-sanitarios',
  templateUrl: './lista-centros-sanitarios.component.html',
  styleUrls: ['./lista-centros-sanitarios.component.scss']
})

export class ListaCentrosSanitariosComponent implements OnInit {
  public centros_sanitarios: ICentroSanitario[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  elementosPaginacion: number = environment.num_paginacion;

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.centros_sanitarios = this.route.snapshot.data['centros_sanitarios'];
    this.titleService.setTitle('Centros sanitarios');
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
