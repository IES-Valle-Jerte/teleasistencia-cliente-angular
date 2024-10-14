import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import {RelacionUsuarioCentro} from "../../../clases/relacion-usuario-centro";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-relacion-usuario-centro',
  templateUrl: './lista-relacion-usuario-centro.component.html',
  styleUrls: ['./lista-relacion-usuario-centro.component.scss']
})
export class ListaRelacionUsuarioCentroComponent implements OnInit {
  public relacionesUsuarioCentro: RelacionUsuarioCentro[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.relacionesUsuarioCentro = this.route.snapshot.data['relaciones_usuario_centro'];
    this.titleService.setTitle('Relacion Usuario Centro');
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
