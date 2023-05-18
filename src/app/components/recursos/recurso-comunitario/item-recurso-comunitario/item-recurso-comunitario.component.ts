import {Component, Input, OnInit} from '@angular/core';
import {IRecursoComunitario} from '../../../../interfaces/i-recurso-comunitario';
import {CargaRecursoComunitarioService} from "../../../../services/recursos/carga-recurso-comunitario.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import {ITipoRecursoComunitario} from "../../../../interfaces/i-tipo-recurso-comunitario";
import {CargaTipoRecursoComunitarioService} from "../../../../services/recursos/carga-tipo-recurso-comunitario.service";


@Component({
  selector: 'item-recurso-comunitario, [item-recurso-comunitario]',
  templateUrl: './item-recurso-comunitario.component.html',
  styleUrls: ['./item-recurso-comunitario.component.scss']
})

export class ItemRecursoComunitarioComponent implements OnInit {
  @Input() public recurso_comunitario: IRecursoComunitario;
  public id: number;

  constructor(private cargaRecursoComunitario: CargaRecursoComunitarioService, private router:Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { // Con el paramMap obtenemos todos los elementos de la URL, dentro del suscribe obtenemos el id que
      //es la variable que necesitamos
      this.id = +params.get('id');
    });
  }

  /*
  * Este método será utilizado para eliminar el recurso llamando al método eliminarRecursoComunitario que tiene
  * como parámetro le pasamos el recurso comunitario que le pasamos con el Input en el tr de lista-recurso-comunitario*/
  eliminarRecurso(): void{
    this.cargaRecursoComunitario.eliminarRecursoComunitario(this.recurso_comunitario).subscribe(
      e => {
        this.router.navigateByUrl('recursos_comunitarios/borrado/'+this.recurso_comunitario.id,{skipLocationChange: true}).then(() => {
          this.router.navigate(['recursos_comunitarios/listar/'+this.id]);
        });
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    )
  }

  //Este método hace que salte el POP-UP para confirmar si quieres eliminar o no el recurso comunitario
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
        this.eliminarRecurso()
      }
    })
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
}
