import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../servicios/auth.service";
import {IAgenda} from "../../../interfaces/i-agenda";
import {ISeguimiento_teleoperador} from "../../../interfaces/i-seguimiento_teleoperador";
import {IAlarma} from "../../../interfaces/i-alarma";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-item-agendas-resueltas , [app-item-agendas-resueltas]',
  templateUrl: './item-agendas-resueltas.component.html',
  styleUrls: ['./item-agendas-resueltas.component.scss']
})
export class ItemAgendasResueltasComponent implements OnInit {
  @Input() public agenda: IAgenda; // Input que servirá para coger una agenda en concreto de la lista

  @Input() public fechaToday: Date = null;
  public prioridad : any;
  public n_expediente : any;


  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.n_expediente = this.agenda.id_paciente.numero_expediente;

  }

}
