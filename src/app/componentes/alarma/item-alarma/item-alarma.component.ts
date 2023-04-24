import { Component, Input, OnInit } from '@angular/core';
import { Alarma } from "../../../clases/alarma";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {CargaAlarmaService} from "../../../servicios/alarmas/carga-alarma.service";
import {AuthService} from "../../../servicios/auth.service";


@Component({
  selector: 'app-item-alarma, [app-item-alarma]',
  templateUrl: './item-alarma.component.html',
  styleUrls: ['./item-alarma.component.scss']
})
export class ItemAlarmaComponent implements OnInit {
  @Input() public alarma: Alarma;
  isAdmin: boolean;
  constructor( private router:Router,private auth:AuthService, private cargarAlarmas: CargaAlarmaService) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
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
  //Toast para el Alert indicando que la operación fue exitosa
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

  modalConfirmacion(): void {
    Swal.fire({
      title: environment.fraseEliminarModal,
      showCancelButton: true,
      confirmButtonColor: environment.colorAceptarModal,
      cancelButtonColor: environment.colorCancelarModal,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarAlarma('alarmas')
      }
    })
  }
  eliminarAlarma(ruta: string): void {
    this.cargarAlarmas.eliminarAlarma(this.alarma).subscribe(
      e => {
        this.router.navigateByUrl(ruta+'/borrado/'+this.alarma.id,{skipLocationChange: true}).then(() => {
          this.router.navigate([ruta]);
        });
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    )
  }
}
