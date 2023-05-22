import {Component, Input, OnInit} from '@angular/core';

import {ITeleoperador} from "../../../interfaces/i-teleoperador";
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
  @Input() public teleoperador: ITeleoperador;

  constructor(private cargaTeleoperador:CargaSeguimientoTeleoperadorService, private router:Router) { }

  ngOnInit(): void {
  }

  alertExito() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      //El tiempo que permanece la alerta, se obtiene mediante una variable global en environment.ts
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: environment.fraseEliminar,
    })
  }
  //Toast para el alert indicando que hubo algún error en la operación
  alertError() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: environment.fraseErrorEliminar
    })
  }
  cargarTeleoperador(ruta: string):void{
    console.log(this.teleoperador);
  }
}
