import {Component, OnInit} from '@angular/core';
import {ITipoModalidadPaciente} from '../../../interfaces/i-tipo-modalidad-paciente';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-tipos-modalidades-pacientes',
  templateUrl: './lista-tipos-modalidades-pacientes.component.html',
  styleUrls: ['./lista-tipos-modalidades-pacientes.component.scss']
})

export class ListaTiposModalidadesPacientesComponent implements OnInit {
  public tipos_modalidades_pacientes: ITipoModalidadPaciente[];
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) {
  }

  ngOnInit(): void {
    this.tipos_modalidades_pacientes = this.route.snapshot.data['tipos_modalidades_pacientes'];
    this.titleService.setTitle('Tipos situaciones pacientes');
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
