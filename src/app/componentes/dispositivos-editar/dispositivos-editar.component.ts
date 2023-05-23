import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {AuthService} from "../../servicios/auth.service";

@Component({
  selector: 'app-dispositivos-editar',
  templateUrl: './dispositivos-editar.component.html',
  styleUrls: ['./dispositivos-editar.component.scss']
})
export class DispositivosEditarComponent implements OnInit {

  /*  Atributos  */
  @Output() public desplegar = new EventEmitter;
  @Input() public blockEditar;
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
  public isAdmin: boolean;
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
              private cargaVivienda: CargaViviendaService,
              private auth: AuthService) {


  }

  ngOnInit(): void {
    this.listaDeSituaciones = this.route.snapshot.data['tipos_situaciones'];
    this.clasificacionAlarmas = this.route.snapshot.data['clasificaciones_alarmas'];
    this.buildForm();  //Formularios reactivos
    this.isAdmin = this.auth.isAdmin();
  }

  /* formulario reactivo */
  private buildForm() {
    this.crearPaciente.getPaciente(this.crearPaciente.idPacienteEditar).subscribe(
      paciente => {
        this.formulario.patchValue({
          fecha_alta: paciente.id_terminal.fecha_tipo_situacion,
          situacion: paciente.id_terminal.id_titular.id_terminal.id_tipo_situacion,
          numero_terminal: paciente.id_terminal.numero_terminal,
          modelo_terminal: paciente.id_terminal.modelo_terminal,
          ucr: paciente.tiene_ucr
        })
        this.terminal = paciente.id_terminal;
        this.idVivienda = paciente.id_terminal.id_tipo_vivienda.id;

      }
    )
    this.formulario = this.formBuilder.group({
      fecha_alta: ['', [Validators.required,
        validacionFechaMaxima()]],
      situacion: ['', [Validators.required]],
      numero_terminal: ['', [Validators.required, Validators.pattern(environment.regex_ter)]],
      modelo_terminal: ['', [Validators.required, Validators.pattern(environment.regex_modelo_ter)]],
      ucr: [false, {disabled: this.blockEditar}, [Validators.required]]
    });
  }

  refresco() {
    this.actualizarTiposSituaciones(this.formulario.value.tipos_personas);
  }

  mostrarEditarTipo() {
    this.mostrarModificar = !this.mostrarModificar;
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
    this.desplegar.emit(true);
  }


  subirDatos() {
    this.idPaciente = this.crearPaciente.idPacienteEditar;
    let datos;
    datos = {
      modelo_terminal: this.formulario.value.modelo_terminal,
      numero_terminal: this.formulario.value.numero_terminal,
      id_titular: this.crearPaciente.idPacienteEditar,
      id_tipo_vivienda: this.terminal.id_tipo_vivienda.id,
      id_tipo_situacion: this.formulario.value.situacion,
      fecha_tipo_situacion: this.formulario.value.fecha_alta
    }


    this.cargaTerminal.modificarTerminalPorId(this.terminal.id, datos).subscribe(
      terminal => {
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    )

    this.crearPaciente.getPaciente(this.crearPaciente.idPacienteEditar).subscribe(
      pac => {
        pac.tiene_ucr = this.formulario.value.ucr;
        this.crearPaciente.modificarPaciente(pac).subscribe(
          () => {
            this.alertExito()
          },
          error => {
            this.alertError()
          }
        )
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


    this.situaciones.eliminarTipoSituacion(this.formulario.value.situacion).subscribe(
      e => {
        this.formulario.get('situacion').setValue('');
        this.alertExitoBorrar()
      },
      error => {
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
