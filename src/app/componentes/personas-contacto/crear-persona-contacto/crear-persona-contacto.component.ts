import {Component, OnInit, ViewChild,  ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
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
import {CargaPacienteService} from "../../../servicios/paciente/carga-paciente.service";
import {IPaciente} from "../../../interfaces/i-paciente";
import {IRelacionPacientePersona} from "../../../interfaces/i-relacion-paciente-persona";
import {MostrarCrearComponent} from "../mostrar-crear/mostrar-crear.component";

@Component({
  selector: 'app-crear-persona-contacto',
  templateUrl: './crear-persona-contacto.component.html',
  styleUrls: ['./crear-persona-contacto.component.scss']
})
export class CrearPersonaContactoComponent implements OnInit {
  @ViewChild('contenedor', { read: ViewContainerRef }) container: ViewContainerRef;

  componentIndex = 0;
  maxComponents = 3;
  idRelacion: number;

  mostrarGuardar = true;
  mostrarEditar = false;
  submitted = false;
  public relacionPacientePersona: IRelacionPacientePersona | any;
  public direccion: IDireccion | any;
  public pacientes: IPaciente[] | any;
  public paciente: IPaciente | any;
  public formulario: FormGroup | any;
  lista = [];
  public fecha_actual = new Date();
  public relacionBorrar : IRelacionPacientePersona |any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private route: ActivatedRoute, private router: Router, private  formBuilder: FormBuilder,private cargaPersonas: CargaPersonaService, private cargaDireccion: CargaDireccionService, private cargaPacientes: CargaPacienteService, private cargaRelacion: CargaRelacionPacientePersonaService) {
}


ngOnInit() {
  this.crearFormulario();
  this.relacionPacientePersona = new RelacionPacientePersona();

  this.pacientes = this.cargaPacientes.getPacientes().subscribe(
    paciente => {
        this.pacientes = paciente;
    },
    error => console.log(error),
    () => console.log("Fin del observable")
  )

}


crearFormulario(){
  this.formulario = this.formBuilder.group({
    nombre: ['',[Validators.required,Validators.maxLength(200)]],
    apellidos: ['',[Validators.required,Validators.maxLength(200)]],
    telefono_fijo: ['',[Validators.required,Validators.maxLength(200),Validators.pattern("^((\\\\+91-?)|0)?[0-9]{9}$")]],
    pacientes: ['',[Validators.required]],
    tipo_relacion:['',[Validators.required]],
    tiene_llaves_vivienda: ['', [Validators.required]],
    disponibilidad: ['',[Validators.required]],
    observaciones: ['',[Validators.required]],
    prioridad: ['',[Validators.required]],
    es_conviviente: ['',[Validators.required,Validators.maxLength(200)]]
  })



/*

  */

}
  borrarRelacion(){
    this.cargaRelacion.getRelacionPacientePersona(this.idRelacion).subscribe(
      relacion => {
        this.relacionBorrar = relacion
      }, error => console.log(error),
      () => {
        this.cargaRelacion.eliminarRelacionPacientePersona(this.relacionBorrar).subscribe(
          () =>{
            this.alertExito();

          }, error => console.log(error),
          () =>{
              this.formulario.reset();
            this.mostrarGuardar = true;
            this.mostrarEditar = false;
          }
        )
      }
    )
  }

  editarRelacion(){
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
      'id_paciente': this.formulario.get('pacientes').value

    }
    this.cargaRelacion.getRelacionPacientePersona(this.idRelacion).subscribe(
      relacion => {
        this.relacionBorrar = relacion
      }, error => console.log(error),
      () => {
        this.cargaRelacion.modificarRelacion(this.relacionBorrar.id,this.relacionPacientePersona).subscribe(
          () =>{

            this.alertExito();

          }, error => console.log(error),
          () =>{

          }
        )
      }
    )


  }

crearRelacion(){

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
           'id_paciente': this.formulario.get('pacientes').value

  }

  this.cargaRelacion.nuevaRelacionPacientePersona(this.relacionPacientePersona).subscribe(
    persona =>{
      this.idRelacion = persona.id;
      this.alertExito()
    }
  )

}

crearHtml(){

  if (this.componentIndex < this.maxComponents) {
    const componente = this.componentFactoryResolver.resolveComponentFactory(MostrarCrearComponent);
    const componenteRef = componente.create(this.container.injector);
    this.componentIndex++;
    componenteRef.instance.onBorrarComponente.subscribe(() => {
      this.borrarComponente(componenteRef);
      this.componentIndex--;
    });

    this.container.insert(componenteRef.hostView);
  } else {
    console.log('No se pueden crear más componentes');
  }
}
  borrarComponente(componenteRef: any) {
    componenteRef.destroy();
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
      title: environment.fraseCrear,
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
      title: environment.fraseErrorCrear
    })
  }

  get nombre(){
    return this.formulario.get('nombre') as FormControl;
  }
  get apellidos(){
    return this.formulario.get('apellidos') as FormControl;
  }
  get telefono_fijo(){
    return this.formulario.get('telefono_fijo') as FormControl;
  }
  get prioridad(){
    return this.formulario.get('prioridad') as FormControl;
  }

  get tipo_relacion(){
    return this.formulario.get('tipo_relacion') as FormControl;
  }

  get form() {
    return this.formulario.controls;
  }
}
