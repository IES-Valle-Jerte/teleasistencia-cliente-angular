import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../servicios/auth.service";
import {IAgenda} from "../../../interfaces/i-agenda";
import {IAgendas} from "../../../interfaces/i-agendas";

@Component({
  selector: 'app-item-alarmas-resueltas , [app-item-alarmas-resueltas]',
  templateUrl: './item-alarmas-resueltas.component.html',
  styleUrls: ['./item-alarmas-resueltas.component.scss']
})
export class ItemAlarmasResueltasComponent implements OnInit {
  @Input() public agendasResuelta:IAgendas;


  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {

    console.log(this.agendasResuelta);
  }

}
