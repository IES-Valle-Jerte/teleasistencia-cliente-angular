import {Component, Input, OnInit} from '@angular/core';
import {ITipoAlarma} from '../../../interfaces/i-tipo-alarma';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {CargaTipoAlarmaService} from "../../../servicios/carga-tipo-alarma.service";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-item-tipo-alarma, [app-item-tipo-alarma]',
  templateUrl: './item-tipo-alarma.component.html',
  styleUrls: ['./item-tipo-alarma.component.scss']
})

export class ItemTipoAlarmaComponent implements OnInit {
  @Input() public tipo_alarma: ITipoAlarma;

  constructor(private cargaTipoAlarma: CargaTipoAlarmaService,private router: Router) {
  }

  ngOnInit(): void {
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
      title: '¿Está seguro que desea eliminar este tipo de alarma?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarTipoAlarma('tipos_alarmas')
      }
    })
  }
  eliminarTipoAlarma(ruta: string) : void{
    this.cargaTipoAlarma.eliminarTipoAlarma(this.tipo_alarma).subscribe(
      e=>{
        this.router.navigateByUrl(ruta+'/borrado/'+this.tipo_alarma.id, {skipLocationChange: true}).then(() => {
          this.router.navigate([ruta]);
        });
        //Si el elemento se ha borrado con exito, llama al método que muestra el alert de Exito
        this.alertExito()
      },
      error => {
        //Si ha habido algún error al eliminar el elemento, llama al método que muestra el alert de Error
        this.alertError()
      }
    )
  }
}
