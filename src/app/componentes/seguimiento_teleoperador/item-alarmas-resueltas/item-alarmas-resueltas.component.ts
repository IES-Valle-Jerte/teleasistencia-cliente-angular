import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../servicios/auth.service";
import {IAgenda} from "../../../interfaces/i-agenda";
import {IAgendas} from "../../../interfaces/i-agendas";
import {IAlarma} from "../../../interfaces/i-alarma";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-item-alarmas-resueltas , [app-item-alarmas-resueltas]',
  templateUrl: './item-alarmas-resueltas.component.html',
  styleUrls: ['./item-alarmas-resueltas.component.scss']
})
export class ItemAlarmasResueltasComponent implements OnInit {
  @Input() public agenda: IAgenda; // Input que servirá para coger una agenda en concreto de la lista
  @Input() public alarmas: IAlarma;
  @Input() public fechaToday: Date = null;
  public prioridad : any;
  public n_expediente : any;


  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.agenda);
    console.log(this.alarmas);
    this.n_expediente = this.agenda.id_paciente.numero_expediente;
  }

}
