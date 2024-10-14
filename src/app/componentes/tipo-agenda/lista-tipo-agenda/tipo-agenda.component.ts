import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ITipoAgenda} from "../../../interfaces/i-tipo-agenda";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-tipo-agenda',
  templateUrl: './tipo-agenda.component.html',
  styleUrls: ['./tipo-agenda.component.scss']
})
export class TipoAgendaComponent implements OnInit {
  public tipos_agenda: ITipoAgenda[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  // Carga de datos para mostrarlos en la tabla.
  ngOnInit(): void {
    this.tipos_agenda = this.route.snapshot.data['tipos_agenda'];
    this.titleService.setTitle('Tipos agenda');
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
