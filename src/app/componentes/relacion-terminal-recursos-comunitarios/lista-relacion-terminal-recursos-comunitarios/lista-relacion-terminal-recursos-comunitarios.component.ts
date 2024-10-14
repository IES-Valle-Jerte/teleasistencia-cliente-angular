import { Component, OnInit } from '@angular/core';
import { RelacionTerminalRecursoComunitarios} from "../../../clases/relacion-terminal-recurso-comunitarios";
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-relacion-terminal-recursos-comunitarios',
  templateUrl: './lista-relacion-terminal-recursos-comunitarios.component.html',
  styleUrls: ['./lista-relacion-terminal-recursos-comunitarios.component.scss']
})
export class ListaRelacionTerminalRecursosComunitariosComponent implements OnInit {
  public relacionRecursos: RelacionTerminalRecursoComunitarios[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.relacionRecursos = this.route.snapshot.data['relacion_terminal_recursos_comunitarios'];
    this.titleService.setTitle('Relacion Terminal Recurso Comunitarios');
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
