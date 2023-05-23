import {Component, Input, OnInit} from '@angular/core';
import {Alarma} from "../../../clases/alarma";
import {Router} from "@angular/router";
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-item-alarmas-resueltas , [app-item-alarmas-resueltas]',
  templateUrl: './item-alarmas-resueltas.component.html',
  styleUrls: ['./item-alarmas-resueltas.component.scss']
})
export class ItemAlarmasResueltasComponent implements OnInit {
  @Input()public alarmaResuelta:Alarma
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
  obtenerNombre(): string {
    if (this.alarmaResuelta.id_teleoperador != null)
      return this.alarmaResuelta.id_teleoperador.first_name
    else
      return ""
  }

  obtenerUcr(): string {
    if (this.alarmaResuelta.id_paciente_ucr != null)
      return this.alarmaResuelta.id_paciente_ucr.id_persona.nombre + ' ' + this.alarmaResuelta.id_paciente_ucr.id_persona.apellidos
    else
      return ""
  }

  obtenerTerminal(): string {
    if (this.alarmaResuelta.id_terminal != null)
      return this.alarmaResuelta.id_terminal.numero_terminal
    else
      return ""
  }
}
