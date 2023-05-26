import {Component, Input, OnInit} from '@angular/core';

import {IUserAlarmasAgendasResueltas} from "../../../interfaces/i-UserAlarmasAgendasResueltas";
import {CargaSeguimientoTeleoperadorService} from "../../../servicios/carga-seguimiento-teleoperador.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-item-teleoperador,[app-item-teleoperador]',
  templateUrl: './item-teleoperador.component.html',
  styleUrls: ['./item-teleoperador.component.scss']
})
export class ItemTeleoperadorComponent implements OnInit {
  @Input() public teleoperador: IUserAlarmasAgendasResueltas;

  constructor( private router: Router) {
  }

  ngOnInit(): void {
  }


}
