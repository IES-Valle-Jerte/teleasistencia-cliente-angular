import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Terminal } from "../../../clases/terminal";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";


@Component({
  selector: 'app-lista-terminal',
  templateUrl: './lista-terminal.component.html',
  styleUrls: ['./lista-terminal.component.scss']
})
export class ListaTerminalComponent implements OnInit {
  public terminales: Terminal[]
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.terminales = this.route.snapshot.data['terminales']
    this.titleService.setTitle('Terminal');
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
