import {Component, Input, OnInit} from '@angular/core';
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
  }

}
