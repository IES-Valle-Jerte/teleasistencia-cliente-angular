import {Component, ComponentFactoryResolver, EventEmitter, OnInit, Output} from '@angular/core';
import {IRecursoComunitario} from "../../../interfaces/i-recurso-comunitario";
import {ITipoRecursoComunitario} from "../../../interfaces/i-tipo-recurso-comunitario";
import {IRelacionTerminalRecursoComunitarios} from "../../../interfaces/i-relacion-terminal-recurso-comunitarios";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {
  CargaRelacionTerminalRecursosComunitariosService
} from "../../../servicios/relacion-terminal-recurso-comunitario/carga-relacion-terminal-recursos-comunitarios.service";
import {CargaTerminalesService} from "../../../servicios/terminal/carga-terminales.service";
import {CargaTipoRecursoComunitarioService} from "../../../services/recursos/carga-tipo-recurso-comunitario.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RelacionTerminalRecursoComunitarios} from "../../../clases/relacion-terminal-recurso-comunitarios";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {CargaRecursoComunitarioService} from "../../../services/recursos/carga-recurso-comunitario.service";
import {IPaciente} from "../../../interfaces/i-paciente";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {CargaPersonaService} from "../../../servicios/carga-persona.service";

@Component({
  selector: 'app-crear-datos-sanitarios',
  templateUrl: './crear-datos-sanitarios.component.html',
  styleUrls: ['./crear-datos-sanitarios.component.scss']
})
export class CrearDatosSanitariosComponent implements OnInit {
  public edit: boolean = false;
  public mostrar: boolean = false;
  public id: number = 0;
  @Output() public plegar = new EventEmitter;
  @Output() public desplegar = new EventEmitter;

  public recurso_comunitario: IRecursoComunitario | any;
  public tipos_recursos_comunitarios: ITipoRecursoComunitario[] | any;
  public relacion_terminal_recurso: IRelacionTerminalRecursoComunitarios | any;
  public formulario: FormGroup | any;
  public formularioRecurso: FormGroup | any;
  public recurso: IRecursoComunitario | any;
  public recursoBorrad: IRelacionTerminalRecursoComunitarios | any;
  public recursosMostrados: IRecursoComunitario[];
  public arrayRelaciones: IRelacionTerminalRecursoComunitarios [] = [];
  public pacientes: IPaciente[] | any;
  public mostrarTabla = false;
  public idPaciente: number;
  public recursoMostrar: IRecursoComunitario | any;
  public plegado: boolean = false;


  constructor(private cargaPersonas: CargaPersonaService, private componentFactoryResolver: ComponentFactoryResolver, private route: ActivatedRoute, private titleService: Title, private router: Router, private cargaRelacionTerminalRecursosComunitarios: CargaRelacionTerminalRecursosComunitariosService, private cargaRelacionTerminal: CargaTerminalesService, private cargaTiposRecursos: CargaTipoRecursoComunitarioService, private formBuilder: FormBuilder, private cargaDireccion: CargaDireccionService, private cargaRecurso: CargaRecursoComunitarioService, private paciente: CargaPacienteService) {
  }

  //Carga todas las peticiones GET para así mostrarlas en la página. Junto con la creación de una nueva terminal.
  ngOnInit(): void {
    this.relacion_terminal_recurso = new RelacionTerminalRecursoComunitarios();

    this.cargaRecurso.getDatosSanitario(1).subscribe(
      recursos => {
        this.recursosMostrados = recursos;
      },
      error => console.log(error),
    )
    this.paciente.getPacientes().subscribe(
      pacientes => {
        this.pacientes = pacientes;
      }
    )

    this.crearFormulario();
  }

  volver() {
    this.plegado = !this.plegado;
    this.desplegar.emit(true);
  }

//Función que determina si se pulsa o no en el selector de Recursos. Si no se pulsa aparece con cierta opacidad.
  desactivado() {
    return (this.formularioRecurso.value.recurso == '') || (this.formularioRecurso.value.recurso == null);

  }

  //Crea el formulario gracias a los formularios reactivos que uso.
  crearFormulario() {
    this.formulario = this.formBuilder.group(
      {
        nuss: ['', [Validators.required, Validators.pattern("^\\d*\\.?\\d+$")]]
      }
    )
    this.formularioRecurso = this.formBuilder.group(
      {
        recurso: ['', [Validators.required]],
        tiempo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]

      }
    )
  }


  //Metodo usado para poder seleccionar la ID de nuestro recurso y que realice un GET para al darle al boton de Eye, aparezca la tarjeta.
  seleccionarId(recursoId: any) {

    if (recursoId != null) {

      this.cargaRecurso.idRecursoVer = recursoId;
      this.cargaRecurso.getRecursoComunitario(this.cargaRecurso.idRecursoVer).subscribe(
        recurso => {
          this.recursoMostrar = recurso;
        }
      )
    } else {
      this.recursoMostrar = null;
    }

  }


  //Metodo que crea la relación Terminal-Recurso. Esta hace un GET de la ID del Recurso y lo guarda, creando luego la relacion y haciendo un POST con la nueva
  //relacion. Trae como resultado un POST de Relacion Terminal. Este metodo tiene un booleano que hace que se muestre una tabla con todos las relaciones
  crearRelacion() {
    this.cargaRecurso.getRecursoComunitario(this.formularioRecurso.get('recurso').value).subscribe(
      recurso => {
        this.recurso = recurso;
      }, error => console.log(error),
      () => {

        this.relacion_terminal_recurso = {
          'id_terminal': this.cargaRelacionTerminal.idTerminal,
          'id_recurso_comunitario': this.recurso.id,
          'tiempo_estimado': this.formularioRecurso.get('tiempo').value
        }
        this.cargaRelacionTerminalRecursosComunitarios.nuevaRelacionRecurso(this.relacion_terminal_recurso).subscribe(
          relacion => {
            this.alertExito();
            this.arrayRelaciones.push(relacion);
            this.ordenarPorTiempo();
          }
        )

      }
    )
    this.mostrarTabla = true;

  }

  //Ordena el array de recursos por tiempo de mayor a menor.
  ordenarPorTiempo(): void {
    this.arrayRelaciones.sort((a, b) => b.tiempo_estimado - a.tiempo_estimado);
  }


  //Mando la ID del Recurso en específico junto con la posición y elimino el recurso en cuestión
  //Me traigo primero la terminal para posteriormente borrarlo de mi array de arrayRelaciones y eliminar la relación.
  borrarRecurso(id: number, i: number) {
    
    Swal.fire({
      title: '¿Está seguro que desea eliminar este recurso?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cargaRelacionTerminalRecursosComunitarios.getRelacionTerminalRecursoComunitario(id).subscribe(
          terminal => {
            this.recursoBorrad = terminal
          },
          error => console.log(error),
          () => {
            this.arrayRelaciones.splice(i, 1);
            this.cargaRelacionTerminalRecursosComunitarios.eliminarRelacionRecurso(this.recursoBorrad).subscribe(
              () => {
                this.alertBorrarRecurso();
              }
            )
    
          }
        )
      }
    })

  }


  //Tomo la ID del Paciente generado de Datos Personales para así modificar luego el numero de Seguridad Social del Paciente.
  //Trae como resultado un PATCH del NUSS
  actualizarNuss() {

    this.paciente.modificarNUSS(this.paciente.idPaciente, this.formulario.get('nuss').value).subscribe(
      () => {
        this.alertExito();
        this.plegar.emit(false);
      }
    )

  }

//Estos GET sirven para así poder tomar el valor de los mismos del formulario en cuestión
  get nombre() {
    return this.formularioRecurso.get('nombre') as FormControl;
  }

  get nuss() {
    return this.formulario.get('nuss') as FormControl;
  }

  get telefono() {
    return this.formularioRecurso.get('telefono') as FormControl;

  }

  get localidad() {
    return this.formularioRecurso.get('localidad') as FormControl;
  }

  get provincia() {
    return this.formularioRecurso.get('provincia') as FormControl;
  }


  get direccion() {
    return this.formularioRecurso.get('direccion') as FormControl;
  }

  get codigo_postal() {
    return this.formularioRecurso.get('codigo_postal') as FormControl;
  }

  get tiempo() {
    return this.formularioRecurso.get('tiempo') as FormControl;
  }

//-------------------------------------------------------


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

  contraer() {
    this.plegado = !this.plegado;
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
}

