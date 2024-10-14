
import {Component, OnInit} from '@angular/core';
import {ITipoAlarma} from '../../../interfaces/i-tipo-alarma';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-tipos-alarmas',
  templateUrl: './lista-tipos-alarmas.component.html',
  styleUrls: ['./lista-tipos-alarmas.component.scss']
})

export class ListaTiposAlarmasComponent implements OnInit {
  public tipos_alarmas: ITipoAlarma[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.tipos_alarmas = this.route.snapshot.data['tipos_alarmas'];
    this.titleService.setTitle('Tipos alarmas');
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
