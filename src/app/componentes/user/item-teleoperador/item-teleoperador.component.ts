import {Component, Input, OnInit} from '@angular/core';
import {IUsers} from "../../../interfaces/i-users";
import {ITeleoperador} from "../../../interfaces/i-teleoperador";

@Component({
  selector: 'app-item-teleoperador',
  templateUrl: './item-teleoperador.component.html',
  styleUrls: ['./item-teleoperador.component.scss']
})
export class ItemTeleoperadorComponent implements OnInit {
  @Input() public teleoperador: ITeleoperador;

  constructor() { }

  ngOnInit(): void {
  }

}
