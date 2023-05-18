import {Component, Input, OnInit} from '@angular/core';
import {ITipoRecursoComunitario} from '../../../../interfaces/i-tipo-recurso-comunitario';
import Swal from "sweetalert2";
import {CargaTipoRecursoComunitarioService} from "../../../../services/recursos/carga-tipo-recurso-comunitario.service";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-tipo-recurso-comunitario, [app-item-tipo-recurso-comunitario]',
  templateUrl: './item-tipo-recurso-comunitario.component.html',
  styleUrls: ['./item-tipo-recurso-comunitario.component.scss']
})

export class ItemTipoRecursoComunitarioComponent implements OnInit {
  @Input() public tipo_recurso_comunitario: ITipoRecursoComunitario;

  constructor(private cargaTipoRecursoComunitario: CargaTipoRecursoComunitarioService, private router: Router) {
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
      title: '¿Está seguro que desea eliminar este tipo de recurso comunitario?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarTipoRecursoComunitario('tipos_recursos_comunitarios')
      }
    })
  }
  eliminarTipoRecursoComunitario(ruta: string) : void{
    this.cargaTipoRecursoComunitario.eliminarTipoRecursoComunitario(this.tipo_recurso_comunitario).subscribe(
      e=>{
        this.router.navigateByUrl(ruta+'/borrado/'+this.tipo_recurso_comunitario.id, {skipLocationChange: true}).then(() => {
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
