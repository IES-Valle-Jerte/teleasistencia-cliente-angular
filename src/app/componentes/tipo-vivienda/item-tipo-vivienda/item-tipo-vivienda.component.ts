import {Component, Input, OnInit} from '@angular/core';
import {ITipoVivienda} from "../../../interfaces/i-tipo-vivienda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Route, Router} from "@angular/router";
import {CargaViviendaService} from "../../../servicios/carga-vivienda.service";

@Component({
  selector: 'app-item-tipo-vivienda, [app-item-tipo-vivienda]',
  templateUrl: './item-tipo-vivienda.component.html',
  styleUrls: ['./item-tipo-vivienda.component.scss']
})
export class ItemTipoViviendaComponent implements OnInit {
  @Input() public tipo_vivenda: ITipoVivienda;

  constructor(private router:Router, private cargaTipoVivienda:CargaViviendaService) { }

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
        this.eliminarTipoVivienda('viviendas')
      }
    })
  }
  eliminarTipoVivienda(ruta: string): void {
    this.cargaTipoVivienda.borrarVivienda(this.tipo_vivenda).subscribe(
      e => {
        this.router.navigateByUrl(ruta+'/borrado/'+this.tipo_vivenda.id, {skipLocationChange: true}).then(() => {
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
