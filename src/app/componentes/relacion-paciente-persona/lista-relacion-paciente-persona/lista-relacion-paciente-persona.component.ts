import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { RelacionPacientePersona } from "../../../clases/relacion-paciente-persona";
import {OrdenacionTablasService} from "../../../servicios/ordenacion-tablas.service";

@Component({
  selector: 'app-lista-relacion-paciente-persona',
  templateUrl: './lista-relacion-paciente-persona.component.html',
  styleUrls: ['./lista-relacion-paciente-persona.component.scss']
})
export class ListaRelacionPacientePersonaComponent implements OnInit {
  public relaciones_pacientes_personas: RelacionPacientePersona[]
  numPaginacion: number = 1;
  inputBusqueda: any = '';

  constructor(private route: ActivatedRoute, private titleService: Title, private ordTabla: OrdenacionTablasService) { }

  ngOnInit(): void {
    this.relaciones_pacientes_personas = this.route.snapshot.data['relaciones_pacientes_personas'];
    this.titleService.setTitle('Relacion Paciente Persona');
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
