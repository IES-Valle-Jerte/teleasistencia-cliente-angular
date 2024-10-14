import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {CentroSanitarioAlarma} from "../../../clases/centro-sanitario-alarma";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-centro-sanitario-alarma',
  templateUrl: './lista-centro-sanitario-alarma.component.html',
  styleUrls: ['./lista-centro-sanitario-alarma.component.scss']
})
export class ListaCentroSanitarioAlarmaComponent implements OnInit {
  public centrosSanitariosAlarma: CentroSanitarioAlarma[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.centrosSanitariosAlarma = this.route.snapshot.data['centros_sanitarios_alarma'];
    this.titleService.setTitle('Centros sanitarios en alarma');
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
