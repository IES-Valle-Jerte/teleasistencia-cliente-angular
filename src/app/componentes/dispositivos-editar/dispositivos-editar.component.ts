import { Component, OnInit } from '@angular/core';
import {ITipoSituacion} from "../../interfaces/i-tipo-situacion";
import {IClasificacionAlarma} from "../../interfaces/i-clasificacion-alarma";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {IPaciente} from "../../interfaces/i-paciente";
import {ITerminal} from "../../interfaces/i-terminal";
import {CargaTipoSituacionService} from "../../servicios/carga-tipo-situacion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaPacienteService} from "../../servicios/carga-paciente.service";
import {CargaHistoricoTipoSituacionService} from "../../servicios/carga-historico-tipo-situacion.service";
import {CargaTerminalesService} from "../../servicios/terminal/carga-terminales.service";
import {CargaAlarmaService} from "../../servicios/alarmas/carga-alarma.service";
import {CargaViviendaService} from "../../servicios/carga-vivienda.service";
import Swal from "sweetalert2";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dispositivos-editar',
  templateUrl: './dispositivos-editar.component.html',
  styleUrls: ['./dispositivos-editar.component.scss']
})
export class DispositivosEditarComponent implements OnInit {

  /*  Atributos  */
  public listaDeSituaciones: ITipoSituacion[];
  public clasificacionAlarmas: IClasificacionAlarma[];
  public formulario: FormGroup;
  public opcion: boolean;
  public mostrar: boolean = false;
  public mostrarModificar: boolean = false;
  public paciente: IPaciente;
  public idPaciente: number;
  public terminal: ITerminal;
  public idTerminal: number;
  public plegado: boolean = false;
  public idVivienda: number;
  /* Expresiones Regulares */

  readonly REGEX_TER = /^\d{4,}$/;


  constructor(private situaciones: CargaTipoSituacionService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private crearPaciente: CargaPacienteService,
              private historicoSituacion: CargaHistoricoTipoSituacionService,
              private cargaTerminal: CargaTerminalesService,
              private cargaAlarma: CargaAlarmaService,
              private cargaVivienda: CargaViviendaService) {


  }

  ngOnInit(): void {
    this.listaDeSituaciones = this.route.snapshot.data['tipos_situaciones'];
    this.clasificacionAlarmas = this.route.snapshot.data['clasificaciones_alarmas'];
    this.buildForm();  //Formularios reactivos

  }

  /* formulario reactivo */
  private buildForm() {
    this.crearPaciente.getPaciente(this.crearPaciente.idPacienteEditar).subscribe(
      paciente => {
        this.formulario.patchValue({
          numero_terminal: paciente.id_terminal.numero_terminal,
          modelo_terminal: paciente.id_terminal.modelo_terminal,
          ucr: paciente.tiene_ucr
        })
        this.idTerminal = paciente.id_terminal.id;
        this.idVivienda = paciente.id_terminal.id_tipo_vivienda.id;

      }
    )
    this.formulario = this.formBuilder.group({
      fecha_alta: ['', [Validators.required,
        validacionFechaMaxima()]],
      situacion: ['', [Validators.required]],
      numero_terminal: ['', [Validators.required, Validators.pattern(this.REGEX_TER)]],
      modelo_terminal: ['', [Validators.required, Validators.pattern(this.REGEX_TER)]],
      ucr: [false, [Validators.required]]
    });
  }


  getToday() {
    return new Date().toISOString().split("T")[0];
  }

  get controles() {
    return this.formulario.controls;
  }

  //Tiene UCR
  elegirOpcion(boolean) {
    this.opcion = !!boolean;
  }

  contraer() {
    this.plegado = !this.plegado;
  }


  subirDatos() {
    this.idPaciente = this.crearPaciente.idPacienteEditar;
    console.log("TERMINAL:" +this.idTerminal);
    let datos;
    let datos2;

    if (this.formulario.value.ucr == true) {
      datos = {
        estado_alarma: this.formulario.value.situacion,
        fecha_registro: this.formulario.value.fecha_alta,
        id_tipo_alarma: 10,
        id_terminal: this.idTerminal,
        id_paciente_ucr: this.crearPaciente.idPacienteEditar
      }
    } else {
      datos = {
        estado_alarma: this.formulario.value.situacion,
        fecha_registro: this.formulario.value.fecha_alta,
        id_tipo_alarma: 10,
        id_terminal: this.idTerminal,
      }
    }


    console.log(datos)
    this.cargaAlarma.nuevaAlarma(datos).subscribe(
      alarma => {
        this.alertExito()
      },
      error => {
        console.log(error.message)
        this.alertError()
      }
    )

    datos2 = {
      modelo_terminal: this.formulario.value.modelo_terminal,
      numero_terminal: this.formulario.value.numero_terminal,
      id_titular: this.crearPaciente.idPacienteEditar,
      id_tipo_vivienda: this.idVivienda
    }

    console.log("DATOS "+datos2)

    this.cargaTerminal.modificarTerminalPorId(this.idTerminal, datos2).subscribe(
      terminal => {
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    )


  }


  //funciones paneles laterales
  desactivado() {
    return (this.formulario.value.situacion == '') || (this.formulario.value.situacion == null);
  }

  mostrarCrearTipo() {
    this.mostrar = !this.mostrar;
  }

  modalConfirmacion(): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta Situacion?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarTipoSituacion()
      }
    })
  }


  private eliminarTipoSituacion() {

    console.log("tipo situacion -->" + this.formulario.value.situacion)

    this.situaciones.eliminarTipoSituacion(this.formulario.value.situacion).subscribe(
      e => {
        //Si el elemento se ha borrado con exito, llama al método que muestra el alert de Exito
        this.alertExitoBorrar()
      },
      error => {
        //Si ha habido algún error al eliminar el elemento, llama al método que muestra el alert de Error
        this.alertErrorBorrar()
      },
      () => {
        this.actualizarTiposSituaciones();
      }
    )
  }


  //FUNCION PARA REFRESACAR LOS TIPOS ADE ALARMA A TIEMPO REAL (SIN RECARGAR LA PAGINA)
  actualizarTiposSituaciones(id_tipo_situacion = null) {
    //peticion para refrescar los tipos de alarmas
    this.situaciones.getTiposSituaciones().subscribe(
      lista => {
        this.listaDeSituaciones = lista;
        this.formulario.patchValue({tipo_situacion: id_tipo_situacion})
      },
      error => {
      },
    );
  }


  //Alertas

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
      title: environment.fraseCrear,
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
      title: environment.fraseErrorCrear
    })
  }

  alertExitoBorrar(): void {
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

  alertErrorBorrar(): void {
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

export function validacionFechaMaxima(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (new Date(control.value) > new Date()) {
      return {fechaExcedida: true};
    }
    return null;
  }
}