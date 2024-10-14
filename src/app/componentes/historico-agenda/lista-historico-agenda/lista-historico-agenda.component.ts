import { Component, OnInit } from '@angular/core';
import {IHistoricoAgenda} from "../../../interfaces/i-historico-agenda";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-historico-agenda',
  templateUrl: './lista-historico-agenda.component.html',
  styleUrls: ['./lista-historico-agenda.component.scss']
})
export class ListaHistoricoAgendaComponent implements OnInit {

  public historicos_de_agenda: IHistoricoAgenda[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(
    private modal: NgbModal,
    private cargaAgendaService: CargaAgendaService,
    private route: ActivatedRoute,
    private titleService: Title,
    private ordTabla: OrdenacionTablasService,
    private router: Router
  ) { }

  // Carga de los datos de todos los históricos de agenda
  ngOnInit(): void {
    this.historicos_de_agenda = this.route.snapshot.data['historicos_de_agenda'];
  }

  // Método para ordenar la tabla al hacer click en los th de la tabla.
  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
  // Esta función se ejecuta cada vez que cambia el valor del input de búsqueda
  onBusquedaChange() {
    // Cuando cambia el filtro, volvemos a la página 1
    this.numPaginacion = 1;
  }
}
