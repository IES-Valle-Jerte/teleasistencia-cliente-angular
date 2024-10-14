import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DispositivosAuxiliaresTerminal } from "../../../clases/dispositivos-auxiliares-terminal";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-dispositivos-auxiliares-terminal',
  templateUrl: './lista-dispositivos-auxiliares-terminal.component.html',
  styleUrls: ['./lista-dispositivos-auxiliares-terminal.component.scss']
})
export class ListaDispositivosAuxiliaresTerminalComponent implements OnInit {
  public dispositivosAuxiliaresTerminal: DispositivosAuxiliaresTerminal[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';
  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.dispositivosAuxiliaresTerminal = this.route.snapshot.data['dispositivos_auxiliares_terminal'];
    this.titleService.setTitle('Dispositivos auxiliares en terminal');
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
