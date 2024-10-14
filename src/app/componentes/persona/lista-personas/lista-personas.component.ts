import {Component, OnInit} from '@angular/core';
import {IPersona} from '../../../interfaces/i-persona';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.scss']
})

export class ListaPersonasComponent implements OnInit {
  public personas: IPersona[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.personas = this.route.snapshot.data['personas'];
    this.titleService.setTitle('Personas');
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
