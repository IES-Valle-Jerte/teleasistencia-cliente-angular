import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RelacionPacientePersona} from "../../../clases/relacion-paciente-persona";
import {
  CargaRelacionPacientePersonaService
} from "../../../servicios/relacion-paciente-persona/carga-relacion-paciente-persona.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CargaPersonaService} from "../../../servicios/carga-persona.service";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import {IDireccion} from "../../../interfaces/i-direccion";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {IPaciente} from "../../../interfaces/i-paciente";
import {IRelacionPacientePersona} from "../../../interfaces/i-relacion-paciente-persona";
import {MostrarCrearComponent} from "../mostrar-crear/mostrar-crear.component";

@Component({
  selector: 'app-crear-persona-contacto',
  templateUrl: './crear-persona-contacto.component.html',
  styleUrls: ['./crear-persona-contacto.component.scss']
})
export class CrearPersonaContactoComponent implements OnInit {
  @ViewChild('contenedorCrear', {read: ViewContainerRef}) container: ViewContainerRef; //Hace referencia al componente hijo y al contenedor del padre mediante un contenedor

  public idPaciente: number;
  public indicesCrear = 2; //Comienzo con el primero indice
  public maximoComponentes = 6; //Maximo numero de componentes que crea al darle al boton de crearHTML()
  public idRelacion: number;
  public primerContacto = 1; //Numero que señala el primero formulario
  public mostrarGuardar = true; //Booleano que sirve para poder no mostrar el boton de guardar contacto
  public mostrarEditar = false; //Booleano que sirve para mostrar los otros dos botones para editar o borrar el contacto
  public submitted = false;
  public plegado: boolean = false;
  public relacionPacientePersona: IRelacionPacientePersona | any;
  public direccion: IDireccion | any;
  public pacientes: IPaciente[] | any;
  public paciente: IPaciente | any;
  private componentesCreados: any[] = []; // Generamos un array de componentes para guardarlos posteriormente
  public opcion = true;
  public opcion2 = true;
  public formulario: FormGroup | any;
  public lista = [];
  public relacionBorrar: IRelacionPacientePersona | any;
  @Output() public plegar = new EventEmitter;
  @Output() public desplegar = new EventEmitter;


  //EXPRESION REGULAR
  readonly REGEX_NOMBREAPELLIDOS = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private cargaPersonas: CargaPersonaService,
              private cargaDireccion: CargaDireccionService,
              private cargaPacientes: CargaPacienteService,
              private cargaRelacion: CargaRelacionPacientePersonaService) {
  }


  ngOnInit() {

    this.crearFormulario();
    this.relacionPacientePersona = new RelacionPacientePersona();


  }


  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(environment.regex_name)]],
      apellidos: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(environment.regex_name)]],
      telefono_fijo: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(environment.regex_telefono)]],
      tipo_relacion: ['', [Validators.required, Validators.pattern(environment.regex_name)]],
      tiene_llaves_vivienda: [true, [Validators.required]],
      disponibilidad: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      prioridad: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      tiempo_domicilio: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      es_conviviente: [true, [Validators.required, Validators.maxLength(200)]]
    })

  }

//Esta funcion coloca una clase en el codigo HTML para ver cual ha escogido
  elegirOpcion(elegirBoolean) {
    if (elegirBoolean) {
      this.opcion = true;
    } else {
      this.opcion = false;
    }
  }

  elegirOpcion2(elegirBoolean) {
    if (elegirBoolean) {
      this.opcion2 = true;
    } else {
      this.opcion2 = false;
    }
  }

  //Elimina la relación que se crea en la Relacion. Le mando la id de la Relacion generada y obtengo la relacion. Una vez hecho eso,
  //le mnando la relacion llamando al metodo DELETE y me la realiza con exito.
  borrarRelacion() {
    this.cargaRelacion.getRelacionPacientePersona(this.idRelacion).subscribe(
      relacion => {
        this.relacionBorrar = relacion
      }, error => console.log(error),
      () => {
        this.cargaRelacion.eliminarRelacionPacientePersona(this.relacionBorrar).subscribe(
          () => {
            this.alertBorrarRecurso();

          }, error => console.log(error),
          () => {
            this.formulario.reset();
            this.mostrarGuardar = true;
            this.mostrarEditar = false;
          }
        )
      }
    )
  }

  editarRelacion() {
    this.relacionPacientePersona = {
      'telefono': this.formulario.get('telefono_fijo').value,
      'nombre': this.formulario.get('nombre').value,
      'apellidos': this.formulario.get('apellidos').value,
      'tipo_relacion': this.formulario.get('tipo_relacion').value,
      'tiene_llaves_viviendas': this.formulario.get('tiene_llaves_vivienda').value,
      'disponibilidad': this.formulario.get('disponibilidad').value,
      'observaciones': this.formulario.get('observaciones').value,
      'prioridad': this.formulario.get('prioridad').value,
      'es_conviviente': this.formulario.get('es_conviviente').value,
      'tiempo_domicilio': this.formulario.get('tiempo_domicilio').value,
      'id_paciente': this.cargaPacientes.idPaciente
    }
    this.cargaRelacion.getRelacionPacientePersona(this.idRelacion).subscribe(
      relacion => {
        this.relacionBorrar = relacion
      }, error => console.log(error),
      () => {
        this.cargaRelacion.modificarRelacion(this.relacionBorrar.id, this.relacionPacientePersona).subscribe(
          () => {

            this.alertEditarRecurso();

          }, error => console.log(error),
          () => {

          }
        )
      }
    )
  }

  crearRelacion() {
    this.relacionPacientePersona = {
      'telefono': this.formulario.get('telefono_fijo').value,
      'nombre': this.formulario.get('nombre').value,
      'apellidos': this.formulario.get('apellidos').value,
      'tipo_relacion': this.formulario.get('tipo_relacion').value,
      'tiene_llaves_viviendas': this.formulario.get('tiene_llaves_vivienda').value,
      'disponibilidad': this.formulario.get('disponibilidad').value,
      'observaciones': this.formulario.get('observaciones').value,
      'prioridad': this.formulario.get('prioridad').value,
      'es_conviviente': this.formulario.get('es_conviviente').value,
      'tiempo_domicilio': this.formulario.get('tiempo_domicilio').value,
      'id_paciente': this.cargaPacientes.idPaciente

    }

    this.cargaRelacion.nuevaRelacionPacientePersona(this.relacionPacientePersona).subscribe(
      persona => {
        this.idRelacion = persona.id;
        this.alertExito()
      }
    )
  }

  contraer() {
    this.plegado = !this.plegado;
    this.plegar.emit(false);
  }
  volver(){
    this.desplegar.emit(true);

  }


  crearHtml() { //Creo el HTML con FactoryResolvver, que sirve para poder crear diferentes componentes segun desee

    if (this.indicesCrear < this.maximoComponentes) { //Si el indice es menor al maximo de componentes, genera el mismo
      const componente = this.componentFactoryResolver.resolveComponentFactory(MostrarCrearComponent); //Usa el componente de mostrarCrear para crear el componente
      const componenteContacto = componente.create(this.container.injector); //Creo el componente justo en el contenedor
      componenteContacto.instance.indice = this.indicesCrear; //Instancio el indice que se usará para mostrar el numero de contacto
      componenteContacto.instance.idPaciente = this.cargaPacientes.idPaciente; //Instancia la id delPaciente a la hora de crear el componente
      this.componentesCreados.push(componenteContacto); //Agregamos todos los componentes que vamos creando poco a poco
      this.indicesCrear++; //Aumento en 1 el indice a la hora de volver a crearlo de nuevo
      this.container.insert(componenteContacto.hostView); //Inserto en el contenedor el componente a la que la vista hace referencia
      componenteContacto.instance.onBorrarComponente.subscribe( //Hago el subscribe aqui ya que aquí creo el componente, solamente entra si le da al boton de borrar
        () => {
          const indiceTomado = componenteContacto.instance.indice; //Tomo el indice que voy a borrar como constante
          this.componentesCreados.splice(this.componentesCreados.indexOf(componenteContacto), 1); // Borramos el componente dado al boton
          this.borrarComponente(componenteContacto); //Borro el componente desde el que hace referencia
          for (const componente of this.componentesCreados) { //Recorremos todo el array generado y cambiamos el indice
            if (componente.instance.indice > indiceTomado) { //Este if compara el indice tomado con los demas, si es superiore, resta a los que sean superiores al mismo
              componente.instance.indice--;
            }
          }
          this.indicesCrear--;
        }
      );
    } else {
      this.alertNoContactos();
    }
  }

  borrarComponente(componenteUsado: any) { //Elimina el componente que elige el usuario con las clases de FactoryResolver
    componenteUsado.destroy(); //Destruye el componente al que hace referencia
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    this.mostrarGuardar = false;
    this.mostrarEditar = true;
    this.crearRelacion();
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
      title: environment.fraseCrear,
    })
  }

  alertNoContactos(): void {
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
      icon: 'error',
      title: environment.fraseContact
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

  //Toast para el Alert indicando que la operación fue borrada de forma exitosa
  alertEditarRecurso(): void {
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
      title: environment.fraseModificar,
    })
  }

  //Toast para el Alert indicando que la operación fue borrada de forma exitosa
  alertBorrarRecurso(): void {
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
      title: environment.fraseEliminarRecurso,
    })
  }

  get nombre() {
    return this.formulario.get('nombre') as FormControl;
  }

  get apellidos() {
    return this.formulario.get('apellidos') as FormControl;
  }

  get telefono_fijo() {
    return this.formulario.get('telefono_fijo') as FormControl;
  }

  get prioridad() {
    return this.formulario.get('prioridad') as FormControl;
  }

  get tipo_relacion() {
    return this.formulario.get('tipo_relacion') as FormControl;
  }


  get tiempo_domicilio() {
    return this.formulario.get('tiempo_domicilio') as FormControl;
  }

  get form() {
    return this.formulario.controls;
  }
}
