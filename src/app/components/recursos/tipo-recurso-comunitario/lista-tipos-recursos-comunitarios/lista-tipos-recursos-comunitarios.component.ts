import {Component, OnInit} from '@angular/core';
import {ITipoRecursoComunitario} from '../../../../interfaces/i-tipo-recurso-comunitario';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-tipos-recursos-comunitarios',
  templateUrl: './lista-tipos-recursos-comunitarios.component.html',
  styleUrls: ['./lista-tipos-recursos-comunitarios.component.scss']
})

export class ListaTiposRecursosComunitariosComponent implements OnInit {
  public tipos_recursos_comunitarios: ITipoRecursoComunitario[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.tipos_recursos_comunitarios = this.route.snapshot.data['tipos_recursos_comunitarios'];
    this.titleService.setTitle('Tipos recursos comunitarios');
  }

  ordenacionTabla(indice: number, tipo: string){
    this.ordTabla.ordenacionService(indice, tipo);
  }
}
