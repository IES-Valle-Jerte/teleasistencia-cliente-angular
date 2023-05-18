import {Component, Input, OnInit} from '@angular/core';
import {IHistoricoAgenda} from "../../../interfaces/i-historico-agenda";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {CargaHistoricoAgendaService} from "../../../servicios/carga-historico-agenda.service";

@Component({
  selector: 'app-item-historico-agenda, [app-item-historico-agenda]',
  templateUrl: './item-historico-agenda.component.html',
  styleUrls: ['./item-historico-agenda.component.scss']
})
export class ItemHistoricoAgendaComponent implements OnInit {

  @Input() public historico_agenda: IHistoricoAgenda;

  constructor(
    private cargaHistoricoAgendaService: CargaHistoricoAgendaService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.historico_agenda.fecha_llamada)
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

  // Función para que salte el diálogo de confirmación al pulsar en el icono "borrar".
  modalConfirmacion(): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarHistoricoDeAgenda('historico_agenda')
      }
    })
  }

  eliminarHistoricoDeAgenda(ruta:string) : void{
    this.cargaHistoricoAgendaService.borrarHistoricoAgenda(this.historico_agenda.id).subscribe(
      e=>{
        this.router.navigateByUrl(ruta+'/borrado/'+this.historico_agenda.id, {skipLocationChange: true}).then(() => {
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
