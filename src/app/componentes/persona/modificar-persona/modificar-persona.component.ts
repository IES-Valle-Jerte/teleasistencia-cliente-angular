import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDireccion} from '../../../interfaces/i-direccion';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaPersonaService} from '../../../servicios/carga-persona.service';
import Swal from "sweetalert2";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import {environment} from "../../../../environments/environment";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {TipoModalidadPaciente} from "../../../clases/tipo-modalidad-paciente";
import {CargaTerminalesService} from "../../../servicios/terminal/carga-terminales.service";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {IPersona} from "../../../interfaces/i-persona";
import {ITerminal} from "../../../interfaces/i-terminal";
import {IPaciente} from "../../../interfaces/i-paciente";
import {CargaTipoModalidadPacienteService} from "../../../servicios/carga-tipo-modalidad-paciente.service";
import {AuthService} from "../../../servicios/auth.service";
import {ITipoModalidadPaciente} from "../../../interfaces/i-tipo-modalidad-paciente";


@Component({
  selector: 'app-modificar-persona',
  templateUrl: './modificar-persona.component.html',
  styleUrls: ['./modificar-persona.component.scss']
})


export class ModificarPersonaComponent implements OnInit {

  /*  Atributos  */
  @Output() public plegar = new EventEmitter;
  @Input() public blockEditar;
  public dire: IDireccion | any;
  public formulario: FormGroup;
  public tipos_personas: TipoModalidadPaciente[];
  public nuevaModalidad: ITipoModalidadPaciente | any;
  public mostrar: boolean = false;
  public mostrarModificar: boolean = false;
  public persona: IPersona | any;
  public terminal: ITerminal | any;
  public paciente: IPaciente | any;
  public idPaciente: number;
  public listaSexo: String[] = ['Hombre', 'Mujer'];
  public pacienteEditar: IPaciente | any;
  public personaEditar: IPersona | any;
  public direccionEditar: IDireccion | any;
  public personaNueva: IPersona |any;
  public name: string | any;
  public plegado: boolean = false;
  public isAdmin: boolean;
  public id_tipo: number;
  public listaProvincias: String[] = ['Álava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  /* Constantes */
  readonly PLANTILLA_OBS = '';



  /**
   * Constructor
   * @param route
   * @param cargaPersonas
   * @param router
   * @param cargaDirecciones
   * @param formBuilder
   * @param crearTerminal
   * @param crearPaciente
   * @param auth
   * @param modalidades
   * @param tipoModalidad
   */
  constructor(private route: ActivatedRoute,
              private cargaPersonas: CargaPersonaService,
              private router: Router,
              private cargaDirecciones: CargaDireccionService,
              private formBuilder: FormBuilder,
              private crearTerminal: CargaTerminalesService,
              private crearPaciente: CargaPacienteService,
              private auth: AuthService,
              private modalidades: CargaTipoModalidadPacienteService,
              private tipoModalidad: CargaTipoModalidadPacienteService
  ) {
  }

  ngOnInit(): void {
    this.tipos_personas = this.route.snapshot.data['tipos_personas'];
    this.buildForm();  //Formularios reactivos
    this.isAdmin = this.auth.isAdmin();
    this.crearPaciente.getPaciente(this.crearPaciente.idPacienteEditar).subscribe(
      paciente =>{
        this.pacienteEditar = paciente;
        
        this.cargaPersonas.getPersona(this.pacienteEditar.id_persona.id).subscribe(
          persona => {
            this.personaEditar = persona;
            this.formulario.patchValue({
              nombre: this.personaEditar.nombre,
              apellidos: this.personaEditar.apellidos,
              expediente: this.pacienteEditar.numero_expediente,
              dni: this.personaEditar.dni,
              fecha_nacimiento: this.personaEditar.fecha_nacimiento,
              sexo: this.personaEditar.sexo,
              telefono_fijo: this.personaEditar.telefono_fijo,
              telefono_movil: this.personaEditar.telefono_movil,
              localidad: this.personaEditar.id_direccion.localidad,
              provincia: this.personaEditar.id_direccion.provincia,
              direccion: this.personaEditar.id_direccion.direccion,
              codigo_postal: this.personaEditar.id_direccion.codigo_postal,
              tipos_personas: this.pacienteEditar.id_tipo_modalidad_paciente.nombre,
              id_tipo: this.pacienteEditar.id_tipo_modalidad_paciente.id,
              text_area: this.pacienteEditar.observaciones_medicas
            })
          }
        )
      }, error => console.log(error)
    )

  }




  /* formulario reactivo */
  private buildForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required,
        Validators.maxLength(200),
        Validators.minLength(2),
        Validators.pattern(environment.regex_name)],
      ],
      apellidos: ['', [Validators.required,
        Validators.maxLength(200),
        Validators.minLength(2),
        Validators.pattern(environment.regex_name)],
      ],
      expediente: ['', [Validators.required,
        Validators.pattern(environment.regex_exp)]],
      dni: ['', [Validators.required,
        Validators.maxLength(9),
        Validators.pattern(environment.regex_dni_nif)],
      ],
      fecha_nacimiento: ['', [
        Validators.required,
        validacionFechaMaxima()
      ]],
      sexo: ['', [Validators.required]],
      telefono_fijo: ['', [Validators.maxLength(12),
        Validators.pattern(environment.regex_fijo)]],
      telefono_movil: ['', [Validators.maxLength(12),
        Validators.pattern(environment.regex_movil)]],
      localidad: ['', [Validators.required,
        Validators.maxLength(200)]],
      provincia: ['', [Validators.required,
        Validators.maxLength(200)]],
      direccion: ['', [Validators.required,
        Validators.maxLength(200),]],
      codigo_postal: ['', [Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern(environment.regex_cp)]],
      tipos_personas: ['', [Validators.required]],
      id_tipo: [''],
      text_area: [this.PLANTILLA_OBS, [Validators.max(250)]]
    });
  }

  /* Getters del Formulario reactivo para los banners de error */
  get controles() {
    return this.formulario.controls;
  }

  cambiarId(){
    this.id_tipo = this.formulario.get('tipos_personas').value;
    this.formulario.get('id_tipo').setValue(this.id_tipo);
  }

  contraer() {
    this.plegado = !this.plegado;
  }

  /* Método para crear personas.*/
  private crearPersona() {

    this.direccionEditar = {
      id: this.personaEditar.id_direccion.id,
      localidad: this.formulario.value.localidad,
      provincia: this.formulario.value.provincia,
      direccion: this.formulario.value.direccion,
      codigo_postal: this.formulario.value.codigo_postal
    }

    this.personaNueva = {
      nombre: this.formulario.value.nombre,
      apellidos: this.formulario.value.apellidos,
      dni: this.formulario.value.dni,
      fecha_nacimiento: this.formulario.value.fecha_nacimiento,
      sexo: this.formulario.value.sexo,
      telefono_fijo: this.formulario.value.telefono_fijo,
      telefono_movil: this.formulario.value.telefono_movil,
      id_direccion: this.direccionEditar
    }
    this.cargaPersonas.modificarPersona(this.personaNueva, this.pacienteEditar.id_persona.id).subscribe(
      e => {
        this.persona = e;
        this.cargaDirecciones.modificarDireccion(this.direccionEditar).subscribe(
          () =>{
            this.nuevoTerminal()

          }
        )

      },
      error => {
        this.alertError();
        console.log("Error al crear la persona -->" + error.message());
      }
    );
  }

  /* Método para crear Terminales */
  private nuevoTerminal() {
    this.terminal = {
      numero_terminal: this.pacienteEditar.id_terminal.numero_terminal,
      id_titular: this.pacienteEditar.id_terminal.id_titular.id,
      id_tipo_vivienda: this.pacienteEditar.id_terminal.id_tipo_vivienda.id,
      modo_acceso_vivienda: this.pacienteEditar.id_terminal.modo_acceso_vivienda,
      barreras_arquitectonicas: this.pacienteEditar.id_terminal.barreras_arquitectonicas
    }
    this.crearTerminal.modificarTerminalPorId(this.pacienteEditar.id_terminal.id, this.terminal).subscribe(
      e => {
        this.terminal = e;
        this.crearTerminal.idTerminal = e.id;

        this.nuevoPaciente();
      },
      error => {
        this.alertError();
        console.log("Error al crear el terminal --> " + error.message());
      }
    );
  }




  nuevoPaciente() {

    this.paciente = {
      id_terminal: this.terminal.id,
      id_persona: this.persona.id,
      tiene_ucr: false,
      numero_expediente: this.formulario.value.expediente,
      numero_seguridad_social: this.formulario.value.numero_seguridad_social,
      prestacion_otros_servicios_sociales: this.formulario.value.prestacion_otros_servicios_sociales,
      observaciones_medicas: this.formulario.value.text_area,
      intereses_y_actividades: this.formulario.value.intereses_y_actividades,
      id_tipo_modalidad_paciente: this.formulario.value.tipos_personas
    }

    this.crearPaciente.modificarPacienteId2(this.pacienteEditar.id,this.paciente).subscribe(
      e => {
        this.paciente = e;
        this.crearPaciente.idPaciente = e.id;
        this.terminal.id_titular = e.id;

        this.plegar.emit(false);
        this.alertExito() // Aquí damos el exito ya que seria la ultima petición encadenada.
      },
      error => {
        this.alertError();
        console.log("Error al crear el paciente --> " + error.message())
      },
    )
  }


  /* Función que crea todas las entidades (Persona , Paciente, Terminal, Direccion) */
  nuevoUsuarioServicio(): void {
    this.crearPersona();

  }


  mostratCrearTipo() {
    this.mostrar = !this.mostrar;
  }


  desactivado() {
    return (this.formulario.value.tipos_personas == '') || (this.formulario.value.tipos_personas == null);
  }


  /* Alertas */

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

  private eliminarTipoModalidad() {
    this.modalidades.eliminarTipoModalidadPaciente(this.formulario.value.tipos_personas).subscribe(
      e => {
        this.alertExitoBorrar()

      },
      error => {
        this.alertErrorBorrar()
        console.log('Error al borrar modalidad de paciente -->' + error.message())
      },
      () => {
        this.actualizarModalidades();
      }
    )
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


  modalConfirmacion(): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este tipo de modalidad?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarTipoModalidad()
      }
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

  mostrarEditarTipo() {
    this.mostrarModificar = !this.mostrarModificar;
  }

  actualizarModalidades(id_tipo_modalidad = null) {
    this.modalidades.getTiposModalidadesPacientes().subscribe(
      lista => {
        this.tipos_personas = lista;
        this.formulario.patchValue({tipos_personas: id_tipo_modalidad})
      }
    );
  }

  getToday() {
    return new Date().toISOString().split("T")[0];
  }
}


/**
 * Validaciones Especiales
 */

export function validacionFechaMaxima(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (new Date(control.value) > new Date()) {
      return {fechaExcedida: true};
    }
    return null;
  }
}
