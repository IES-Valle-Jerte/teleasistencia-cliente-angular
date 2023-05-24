import {Component, Input, OnInit} from '@angular/core';
import {IAlarmasResueltas} from "../../../interfaces/i-alarmas-resueltas";
import {Alarma} from "../../../clases/alarma";

@Component({
  selector: 'app-item-alarmas-resueltas , [item-alarmas-resueltas]',
  templateUrl: './item-alarmas-resueltas.component.html',
  styleUrls: ['./item-alarmas-resueltas.component.scss']
})
export class ItemAlarmasResueltasComponent implements OnInit {
  @Input() public alarma:Alarma;
  constructor() { }

  ngOnInit(): void {
    console.log(this.alarma);
  }
  obtenerNombre(): string {
    if (this.alarma.id_teleoperador != null)
      return this.alarma.id_teleoperador.first_name
    else
      return ""
  }

  obtenerUcr(): string {
    if (this.alarma.id_paciente_ucr != null)
      return this.alarma.id_paciente_ucr.id_persona.nombre + ' ' + this.alarma.id_paciente_ucr.id_persona.apellidos
    else
      return ""
  }

  obtenerTerminal(): string {
    if (this.alarma.id_terminal != null)
      return this.alarma.id_terminal.numero_terminal
    else
      return ""
  }
}
