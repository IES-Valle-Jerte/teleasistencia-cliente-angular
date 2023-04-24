import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {IRecursoComunitario} from "../../../interfaces/i-recurso-comunitario";
import {ITipoRecursoComunitario} from "../../../interfaces/i-tipo-recurso-comunitario";
import {IRelacionTerminalRecursoComunitarios} from "../../../interfaces/i-relacion-terminal-recurso-comunitarios";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {
  CargaRelacionTerminalRecursosComunitariosService
} from "../../../servicios/relacion-terminal-recurso-comunitario/carga-relacion-terminal-recursos-comunitarios.service";
import {ITerminal} from "../../../interfaces/i-terminal";
import {CargaTerminalesService} from "../../../servicios/terminal/carga-terminales.service";
import {CargaTipoRecursoComunitarioService} from "../../../servicios/carga-tipo-recurso-comunitario.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RelacionTerminalRecursoComunitarios} from "../../../clases/relacion-terminal-recurso-comunitarios";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {CargaRecursoComunitarioService} from "../../../servicios/carga-recurso-comunitario.service";
import {IPaciente} from "../../../interfaces/i-paciente";
import {CargaPacienteService} from "../../../servicios/paciente/carga-paciente.service";

@Component({
  selector: 'app-crear-datos-sanitarios',
  templateUrl: './crear-datos-sanitarios.component.html',
  styleUrls: ['./crear-datos-sanitarios.component.scss']
})
export class CrearDatosSanitariosComponent implements OnInit {
  edit = false;
  mostrar = false;
  id = 0;
  public recurso_comunitario: IRecursoComunitario |any;
  public tipos_recursos_comunitarios: ITipoRecursoComunitario[] | any;
  public relaciones_terminales: ITerminal[] | any;
  public relacion_terminal_recurso : IRelacionTerminalRecursoComunitarios | any;
  public formulario: FormGroup | any;
  public recurso: IRecursoComunitario | any ;
  public recursoBorrad: IRelacionTerminalRecursoComunitarios | any;
  public recursosMostrados: IRecursoComunitario[];
  public arrayRelaciones: IRelacionTerminalRecursoComunitarios [] = [];
  public pacientes: IPaciente[] | any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,private route: ActivatedRoute, private titleService: Title, private router: Router, private cargaRelacionTerminalRecursosComunitarios: CargaRelacionTerminalRecursosComunitariosService, private cargaRelacionTerminal: CargaTerminalesService, private cargaTiposRecursos: CargaTipoRecursoComunitarioService, private formBuilder: FormBuilder, private cargaDireccion: CargaDireccionService, private cargaRecurso: CargaRecursoComunitarioService, private cargaPacientes: CargaPacienteService) { }

  ngOnInit(): void {
    this.relacion_terminal_recurso = new RelacionTerminalRecursoComunitarios();
    this.cargaRelacionTerminal.getTerminales().subscribe(
      terminal => {
        this.relaciones_terminales = terminal;
      },
      error => console.log(error),
    );
    this.cargaTiposRecursos.getTiposRecursosComunitarios().subscribe(
      recursos => {
        this.tipos_recursos_comunitarios = recursos;
      },
      error => console.log(error),
    )

    this.cargaRecurso.getDatosSanitario(1).subscribe(
      recursos =>{
        this.recursosMostrados = recursos;
      },
      error => console.log(error),
    )
    this.cargaPacientes.getPacientes().subscribe(
      pacientes => {
        this.pacientes = pacientes;
      }
    )

    this.crearFormulario();
  }


  crearFormulario(){
      this.formulario = this.formBuilder.group(

        {
          pacientes: ['',[Validators.required]],
          nuss: ['',[Validators.required]],
          recurso: ['',[Validators.required]],
          relacion_terminal: ['',[Validators.required]],
          tiempo: ['', [Validators.required]]

        }
      )
  }



  crearRelacion(){
    this.cargaRecurso.getRecursoComunitario(this.formulario.get('recurso').value).subscribe(
      recurso => {
        this.recurso = recurso;
      }, error => console.log(error),
      () =>{

        this.relacion_terminal_recurso = {
          'id_terminal': this.formulario.get('relacion_terminal').value,
          'id_recurso_comunitario': this.recurso.id,
          'tiempo_estimado': this.formulario.get('tiempo').value
        }
        this.cargaRelacionTerminalRecursosComunitarios.nuevaRelacionRecurso(this.relacion_terminal_recurso).subscribe(
          relacion =>{
            this.alertExito();
            this.arrayRelaciones.push(relacion);
            this.ordenarPorTiempo();
          }
        )

      }
    )

  }

  ordenarPorTiempo(): void{
    this.arrayRelaciones.sort((a,b) => b.tiempo_estimado - a.tiempo_estimado);
  }

  borrarRecurso(id: number, i: number) {
    this.cargaRelacionTerminalRecursosComunitarios.getRelacionTerminalRecursoComunitario(id).subscribe(
      terminal => {
        this.recursoBorrad = terminal
      },
      error => console.log(error),
      () =>{
        this.arrayRelaciones.splice(i,1);
        this.cargaRelacionTerminalRecursosComunitarios.eliminarRelacionRecurso(this.recursoBorrad).subscribe(
          () =>{
            this.alertExito();
          }
        )

      }
    )

  }



verRecursos(){
    this.mostrar = !this.mostrar;
}

actualizarNuss(){
      this.cargaPacientes.modificarNUSS(this.formulario.get('pacientes').value, this.formulario.get('nuss').value).subscribe(
        () =>{
          this.alertExito();
        }
      )

}


  get nombre(){
    return this.formulario.get('nombre') as FormControl;
  }

  get telefono(){
    return this.formulario.get('telefono') as FormControl;

  }

  get localidad(){
    return this.formulario.get('localidad') as FormControl;
  }

  get provincia(){
    return this.formulario.get('provincia') as FormControl;
  }


  get direccion(){
    return this.formulario.get('direccion') as FormControl;
  }

  get codigo_postal(){
    return this.formulario.get('codigo_postal') as FormControl;
  }

  get tiempo(){
    return this.formulario.get('tiempo') as FormControl;
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
}

