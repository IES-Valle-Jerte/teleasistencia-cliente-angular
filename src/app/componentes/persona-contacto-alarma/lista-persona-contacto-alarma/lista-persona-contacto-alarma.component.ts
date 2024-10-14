import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {PersonaContactoAlarma} from "../../../clases/persona-contacto-alarma";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-persona-contacto-alarma',
  templateUrl: './lista-persona-contacto-alarma.component.html',
  styleUrls: ['./lista-persona-contacto-alarma.component.scss']
})
export class ListaPersonaContactoAlarmaComponent implements OnInit {
  public personasContactoAlarma: PersonaContactoAlarma[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.personasContactoAlarma = this.route.snapshot.data['personas_contacto_alarma'];
    this.titleService.setTitle('Personas en contacto en alarma');
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
