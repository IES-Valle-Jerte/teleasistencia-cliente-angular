import {Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CargaAlarmaService } from "../../../servicios/alarmas/carga-alarma.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Paciente} from "../../../clases/paciente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAlarma} from "../../../interfaces/i-alarma";
import {
  CargaRelacionPacientePersonaService
} from "../../../servicios/relacion-paciente-persona/carga-relacion-paciente-persona.service";
import {IRelacionPacientePersona} from "../../../interfaces/i-relacion-paciente-persona";
import {
  CargaPersonaContactoAlarmaService
} from "../../../servicios/persona-contacto-alarma/carga-persona-contacto-alarma.service";
import {IClasificacioRecurso} from "../../../interfaces/i-clasificacio-recurso";
import {IRelacionTerminalRecursoComunitarios} from "../../../interfaces/i-relacion-terminal-recurso-comunitarios";
import {IPersonaContactoAlarma} from "../../../interfaces/i-persona-contacto-alarma";


@Component({
  selector: 'app-modificar-cerrar-alarma',
  templateUrl: './modificar-cerrar-alarma.component.html',
  styleUrls: ['./modificar-cerrar-alarma.component.scss']
})
export class ModificarCerrarAlarmaComponent implements OnInit {
  public alarma: IAlarma
  public idAlarma: number
  public paciente_ucr: Paciente
  //FORMS
  public formInf: FormGroup;
  public formPersona: FormGroup;
  public idTerminal: number;
  public idTerminalPersona: number;
  //PERSONA CONTACTO
  public listaPersonas: IRelacionPacientePersona[];
  public personas_en_alarma: IPersonaContactoAlarma[];
  //RECURSOS
  public tiposRecursos: IClasificacioRecurso[];



  constructor(private route: ActivatedRoute,
              private cargaPersonaAlarma: CargaPersonaContactoAlarmaService,private cargarPersona:CargaRelacionPacientePersonaService,
              private titleService: Title,private formBuilder: FormBuilder, private router: Router,
              private cargarAlarmas: CargaAlarmaService) { }

  ngOnInit(): void {
    document.querySelector(".breadcrumb").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    //PETICIONES
    this.alarma = this.route.snapshot.data['alarma'];
    this.idAlarma = this.route.snapshot.params['id'];
    this.personas_en_alarma = this.route.snapshot.data['personas_en_alarma'];
    this.paciente_ucr = this.alarma.id_paciente_ucr
    //FORMULARIO NIVEL 1
    this.formInf = this.formBuilder.group({
      observaciones:[this.alarma?.observaciones,Validators.required],
      resumen:[this.alarma?.resumen,Validators.required],
    })
    //FORMULARIO NIVEL 2
    this.formPersona = this.formBuilder.group({
      persona:['',Validators.required]
    })
    //SACAR ID DE TERMINAL
    if (this.alarma.id_terminal) {
      this.idTerminal = this.alarma.id_terminal.id;
      this.idTerminalPersona = this.alarma.id_terminal.id;
    }else{
      this.idTerminal = this.alarma.id_paciente_ucr.id_terminal.id;
      this.idTerminalPersona = this.alarma.id_paciente_ucr.id;
    }
    //PETICION GET PACIENTES DE CONTACTO
    this.cargarPersona.getRelacionPacientePersonaTerminal(this.idTerminalPersona).subscribe(
      lista =>{
        this.listaPersonas = lista;
        this.filtrarPersonasRelacionPaciente()
      },
      error => {},
      ()=>{
      }
    )
    //NIVEL 3
    this.tiposRecursos = this.route.snapshot.data['clas_recursos']


  }
  //buscamos la opcion que coincida con el buscado para dejarla preseleccionada
  optionSelected(i: number): void {
    document.getElementsByClassName('form-select')[i].setAttribute('selected', '');
  }
  modificarAlarma(redireccion:boolean): void {
    let datos = {
      estado_alarma:"Cerrada",
      observaciones: this.formInf.value.observaciones,
      resumen: this.formInf.value.resumen,
      id_teleoperador: localStorage.getItem("id")
    }
    this.cargarAlarmas.cerrarAlarma(datos,this.idAlarma).subscribe(
      e => {
        this.alertExito()
        if(redireccion){
          this.router.navigate(['/agenda/nueva',this.obtenerIdPaciente()])
        }else{
          this.router.navigate(['/alarmas'])
        }

      },
      error => {
             this.alertError()
      }
    );
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
      title: environment.fraseModificar,
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
      title: environment.fraseErrorModificar
    })
  }
  // funcion que obtiene el nombre del titular
  obtenerNombre() {
    //si existe paciente ucr devolvemos el nombre del titular del ucr y a que pertenece
    if (this.paciente_ucr) {
      return this.paciente_ucr.id_persona.nombre + ' ' + this.paciente_ucr.id_persona.apellidos + ' (UCR)'
    }
    // en otro caso devolvemos el nommbre del titular del terminal
    return  this.alarma.id_terminal.id_titular.id_persona.nombre + ' ' + this.alarma.id_terminal.id_titular.id_persona.apellidos + '(Terminal)'
  }
  obtenerIdPaciente() {
    if (this.paciente_ucr) {
      return this.paciente_ucr.id
    }
    return  this.alarma.id_terminal.id_titular.id
  }
  // funcion que obtiene el telefono fijo

  obtenerTelefonoFijo() {
    //si existe paciente ucr devolvemos el telefono fijo
    if (this.paciente_ucr) {
      return this.paciente_ucr.id_persona.telefono_fijo
    }
    // en otro caso devolvemos el telefono fijo asociado al terminal
    return this.alarma.id_terminal.id_titular.id_persona.telefono_fijo
  }

  // funcion que obtiene el telefono movil
  obtenerTelefonoMovil() {
    //si existe paciente ucr devolvemos el telefono moviul
    if (this.paciente_ucr) {
      return  this.paciente_ucr.id_persona.telefono_movil
    }
    // en otro caso devolvemos el telefono movil asociado al terminal
    return this.alarma.id_terminal.id_titular.id_persona.telefono_movil
  }

  // funcion que obtiene el numero del terminal
  obtenerTerminal() {
    return this.alarma.id_terminal.numero_terminal
  }
  //NIVEL 2
  subirPost(){
    let datos=
    {
      id_alarma:this.idAlarma,
      id_persona_contacto:this.formPersona.value.persona.id,
      fecha_registro:this.fechaActual()
    }
    this.cargaPersonaAlarma.nuevaPersonaContactoAlarma(datos).subscribe(()=>{
      this.cargaPersonaAlarma.getPersonasEnAlarmaSegunId(this.alarma.id).subscribe(personas=>{
          this.personas_en_alarma = personas;
        },
        error => {},
        ()=>{
          this.filtrarPersonasRelacionPaciente();
          this.formPersona.get('persona').setValue(null);
        })
    })
  }
  borrarPersona(objetoPersona:IPersonaContactoAlarma){
    //ELIMINAR EL BLOQUE de PERSONA CORRESPONDIENTE
    let contenedor = document.getElementById('personas');
    contenedor.removeChild(document.getElementById(""+objetoPersona.id))
    this.cargaPersonaAlarma.eliminarPersonaContactoAlarma(objetoPersona).subscribe(
      ()=>{
        this.cargaPersonaAlarma.getPersonasEnAlarmaSegunId(this.alarma.id).subscribe(personas=>{
          this.personas_en_alarma = personas;
          this.cargarPersona.getRelacionPacientePersonaTerminal(this.idTerminalPersona).subscribe(recursos=>{
            this.listaPersonas = recursos;
            //Se llama a esta funcion para filtrar los distintos campos del select
            this.filtrarPersonasRelacionPaciente()
          })
        })
      }
    )
  }

  //Funcion que permite actualizar los valores del select segun los peticiones que se realicen.
  filtrarPersonasRelacionPaciente(){
    let arrayPersonasAlarma = this.personas_en_alarma;
    for(let i = 0;i<arrayPersonasAlarma.length;i++){
      this.listaPersonas = this.listaPersonas.filter(persona => persona.id !== arrayPersonasAlarma[i].id_persona_contacto.id)
    }
  }
  fechaActual(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let hora =fecha.getHours();
    let minutos =fecha.getMinutes();
    return`${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2,'0')}:${minutos.toString().padStart(2, '0')}`;
  }

}
