import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {IDireccion} from '../../../interfaces/i-direccion';
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from 'sweetalert2';
import {environment} from "../../../../environments/environment";
import {Spinner} from "../../../clases/spinner";

@Component({
  selector: 'app-item-direccion, [app-item-direccion]',
  templateUrl: './item-direccion.component.html',
  styleUrls: ['./item-direccion.component.scss']
})

export class ItemDireccionComponent implements OnInit {
  @Input() public direccion: IDireccion;

  constructor(private cargaDirecciones: CargaDireccionService, private router: Router) {
  }

  ngOnInit(): void {
  }

  //Toast para el Alert indicando que la operación fue exitosa
  alertExito(): void {
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
  alertError(): void {
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

  //Modal para confirmar la eliminación de un elemento
  modalConfirmacion(): void {
    Swal.fire({
      title: environment.fraseEliminarModal,
      showCancelButton: true,
      confirmButtonColor: environment.colorAceptarModal,
      cancelButtonColor: environment.colorCancelarModal,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarDireccion('direcciones')
      }
    })
  }

  //Metodo que llama al servicio delete, que elimina el elemento
  eliminarDireccion(ruta: string): void {
    Spinner.mostrarSpiner();
    this.cargaDirecciones.eliminarDireccion(this.direccion).subscribe(
      e => {
        this.router.navigateByUrl(ruta + '/borrado/' + this.direccion.id, {skipLocationChange: true}).then(() => {
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





