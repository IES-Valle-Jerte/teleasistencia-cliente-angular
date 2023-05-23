import { Injectable } from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {environment} from "../../../environments/environment";
import Swal from "sweetalert2";
import {IProfileUser} from "../../interfaces/i-profile-user";
import {ProfileService} from "../profile.service";
import {CargaAlarmaService} from "../alarmas/carga-alarma.service";
import {Router} from "@angular/router";
import {Alarma} from "../../clases/alarma";

@Injectable({
  providedIn: 'root'
})
export class ConexionWsService {
  //establecemos la direccion para la conexion con el websocket
  subject = webSocket(environment.urlWebsocket);
  public alarmaAModificar: Alarma
  public accion: string
  public teleoperador: number
  public grupoTeleoperador: string;

  constructor(private profileService: ProfileService,
              private cargarAlarma: CargaAlarmaService, private router: Router) { }
  //Funcion para conectar el websocket
  conectar(){
    this.subject.subscribe({
      //si va bien arrancará la funcion para comprobar que hacer
      next: msg => this.comprobarAccion(msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    })
  }
  //Si el valor que se retorna es true la conexion de ws no esta activa
  noEstaWsConectado(){
    return !this.subject.closed;
  }
  //comprobamos el tipo de action que nos llega por parametro
  comprobarAccion(msg)
    :
    void {
    //si es una alarma nueva abre el modal de alarma

    if (msg['action'] == 'new_alarm'
    ) {
      this.modalAlarma(msg)
    }
    // si una alarma fue asignada ya se cierra el modal
    if (msg['action'] == 'alarm_assignment') {
      Swal.close()
      this.alertExito(environment.fraseAlarmaAceptada)
    }

    if (msg['action'] == 'alarm_auto_resolve') {
      Swal.close()
      this.alertExito(environment.fraseCerrarAlarmaVoluntario)
    }
  }
  //creamomos el metodo que lanzará el modal
  modalAlarma(msg
                :
                any
  ):
    void {

    //obtenemos el usuario logeado
    this.profileService.getProfile()
      .subscribe((resp: IProfileUser[]) => {
          //obtenemos el nombre del grupo al que pertenece
          this.grupoTeleoperador = resp[0].groups[0].name
          //lanzamos el modal solo si pertenece a los teleoperadores
          if (this.grupoTeleoperador == "teleoperador") {
            //asignamos el valor de action a una variable
            this.accion = msg['action']
            //asignamos el valor de alarma a otra variable
            this.alarmaAModificar = msg['alarma']

            //iniciamos el modal mostrando la id y comprobando la procedencia de la alarma
            Swal.fire({
              html: '<h3>¡Atención! Nueva alarma desde ' + this.comprobarProcedencia(this.alarmaAModificar) + '<h3>' +
                '<p class="left">Identificador de alarma: ' + this.alarmaAModificar.id + '</p>' +
                '<p class="left"> Tipo de alarma: ' + this.alarmaAModificar.id_tipo_alarma.nombre + ' ('+this.alarmaAModificar.id_tipo_alarma.id_clasificacion_alarma.nombre+')'+'</p>' +
                '<p class="left">' + this.comprobarProcedenciaTitular(this.alarmaAModificar) + '</p>' +
                '<p class="left"> Nº Telefono: ' + this.obtenerTelefonoMovil() + '</p>' +
                '<p class="left">¿Desea Asignarse esta alarma?</p>',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.asignarTeleoperador(this.alarmaAModificar)
              }

            })
          }
        }
      )

  }
  // con este metodo se asigna el teleoperador a la alarma y con el servicio se
  // modifica la alarma
  asignarTeleoperador(alarma)
    :
    void {
    this.profileService.getProfile()
      .subscribe((resp: IProfileUser[]) => {
          this.teleoperador = resp[0].id
          this.alarmaAModificar.id_teleoperador = this.teleoperador
          this.cargarAlarma.modificarAlarma(this.alarmaAModificar).subscribe(
            e => {
              this.router.navigate(['alarmas/aceptada/modificar', alarma.id])
            },
            error => {
              this.alertError()
            })
        }
      )


  }
  //Toast para el Alert indicando que la operación fue exitosa
  alertExito(texto:string)
    :
    void {
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
      title: texto,
    })
  }
  comprobarProcedencia(msg)
    :
    string {
    if (msg.id_paciente_ucr) {
      //si no es null devolvemos paciente
      return 'UCR'
    }

    //si no ese null devolvemos terminal
    if (msg.id_terminal)
      return 'Terminal '+msg.id_terminal.numero_terminal
  }
  //comprobamos si está a null pacientes ucr para devolver un string
  comprobarProcedenciaTitular(msg)
    :
    string {
    if (msg.id_paciente_ucr) {
      //si no es null devolvemos el paciente ucr con su nombre
      return 'Titular: ' + msg.id_paciente_ucr.id_persona.nombre + ' ' + msg.id_paciente_ucr.id_persona.apellidos
    }

    //si no ese null el terminal devolvemos  su numero y el titular del mismo
    if (msg.id_terminal)
      return 'Titular: ' + msg.id_terminal.id_titular.id_persona.nombre + ' ' + msg.id_terminal.id_titular.id_persona.apellidos /*+ '' +
        '\nTerminal ' + msg.id_terminal.numero_terminal*/
  }
  obtenerTelefonoMovil() {
    //si existe paciente ucr devolvemos el telefono moviul
    if (this.alarmaAModificar.id_paciente_ucr) {
      return  this.alarmaAModificar.id_paciente_ucr.id_persona.telefono_movil
    }
    // en otro caso devolvemos el telefono movil asociado al terminal
    return this.alarmaAModificar.id_terminal.id_titular.id_persona.telefono_movil
  }
  //Toast para el alert indicando que hubo algún error en la operación
  alertError()
    :
    void {
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
      title: environment.fraseErrorAsignarAlarma
    })
  }
}
