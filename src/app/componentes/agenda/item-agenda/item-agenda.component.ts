import {Component, Input, OnInit} from '@angular/core';
import {IAgenda} from "../../../interfaces/i-agenda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {CargaHistoricoAgendaService} from "../../../servicios/carga-historico-agenda.service";
import {ITipoAgenda} from "../../../interfaces/i-tipo-agenda";
import {IPaciente} from "../../../interfaces/i-paciente";

@Component({
  selector: 'app-item-agenda, [app-item-agenda]',
  templateUrl: './item-agenda.component.html',
  styleUrls: ['./item-agenda.component.scss']
})
export class ItemAgendaComponent implements OnInit {

  @Input() public agenda: IAgenda; // Input que servirá para coger una agenda en concreto de la lista
  @Input() public borrar: Boolean = true; // Input que servirá para saber si se muestra el botón de borrar
  @Input() public fechaToday: Date = null;
  public prioridad : any;
  public n_expediente : any;


  constructor(
    private cargaAgendaService: CargaAgendaService,
    private cargaHistoricoAgendaService: CargaHistoricoAgendaService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.n_expediente = this?.agenda?.id_paciente?.numero_expediente;
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

  // Función para que al hacer click en el botón eliminar salte un diálogo de confirmación
  modalConfirmacion(): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este evento?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarAgenda('agenda')
      }
    })
  }

  // Método que realiza la petición de borrado de una agenda seleccionada
  eliminarAgenda(ruta:string) : void{
    this.cargaAgendaService.borrarAgenda(this.agenda.id).subscribe(
      e=>{
        this.router.navigateByUrl(ruta+'/borrado/'+this.agenda.id, {skipLocationChange: true}).then(() => {
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

  // Método que redirige a la URL "/historico_agenda/modificar" para modificar un histórico de agenda
  // seleccionado mediante el icono, a través del id de la agenda.
  redirigirAhistorico() {
    this.cargaHistoricoAgendaService.getHistoricoAgendaPorIdAgenda(this.agenda.id).subscribe(
      e=>{
        let historico_agenda = e[0];
        this.router.navigate(['/historico_agenda/modificar', historico_agenda.id]);
      },
    )
  }

  //Funcion para deshabilitar botón para crear histórico
  botonDes(){
    if((this.agenda.id_tipo_agenda == '')||(this.agenda.id_tipo_agenda == null)){
      return true;
    }else{
      return false;
    }
  }
}
