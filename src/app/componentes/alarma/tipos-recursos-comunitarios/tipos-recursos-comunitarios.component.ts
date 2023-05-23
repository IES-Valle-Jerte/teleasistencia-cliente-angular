import {Component,Input, OnInit} from '@angular/core';
import {IClasificacioRecurso} from "../../../interfaces/i-clasificacio-recurso";
import {
  CargaRecursosComunitariosAlarmaService
} from "../../../servicios/recursos-comunitarios-alarma/carga-recursos-comunitarios-alarma.service";
import {
  CargaRelacionTerminalRecursosComunitariosService
} from "../../../servicios/relacion-terminal-recurso-comunitario/carga-relacion-terminal-recursos-comunitarios.service";
import {IRelacionTerminalRecursoComunitarios} from "../../../interfaces/i-relacion-terminal-recurso-comunitarios";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAlarma} from "../../../interfaces/i-alarma";
import {IRecursosComunitariosAlarma} from "../../../interfaces/i-recursos-comunitarios-alarma";
import {ActivatedRoute} from "@angular/router";
import {IRecursoComunitario} from "../../../interfaces/i-recurso-comunitario";
import {CargaRecursoComunitarioService} from "../../../services/recursos/carga-recurso-comunitario.service";

@Component({
  selector: 'app-tipos-recursos-comunitarios',
  templateUrl: './tipos-recursos-comunitarios.component.html',
  styleUrls: ['./tipos-recursos-comunitarios.component.scss']
})
export class TiposRecursosComunitariosComponent implements OnInit {

  constructor(private cargarRecrusosNoSanitarios:CargaRecursoComunitarioService, private cargarRecursosAlarma:CargaRecursosComunitariosAlarmaService,private route: ActivatedRoute,private cargaRecursoTerminal: CargaRelacionTerminalRecursosComunitariosService,private formBuilder:FormBuilder) { }
  @Input() clasificacion:IClasificacioRecurso;
  public tipo_recurso:IRelacionTerminalRecursoComunitarios[];
  public tipo_recurso_no_sanitarios:IRecursoComunitario[];
  public recursos_en_alarma:IRecursosComunitariosAlarma[];
  @Input() terminal:number;
  public formAnadir:FormGroup;
  @Input() alarma:IAlarma;



  ngOnInit(): void {
    this.actualizarContenido();

    //Formulario
    this.formAnadir = this.formBuilder.group({
      tipo_recurso:['',Validators.required]
    })

  }
  actualizarContenido () {
    this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(this.alarma.id,this.clasificacion.id).subscribe(
      recursos_alarma=>{
        this.recursos_en_alarma = recursos_alarma;
      },
      error => {},
      ()=>{
        // Si clasificacíón.id == 1 es porque es Sanitario, en este caso los recursos son asociados al terminal
        // El resto de recursos de clasificación !=1 son genéricos
        if (this.clasificacion.id == 1){
          this.cargaRecursoTerminal.getRecursosComunitarioClasificacion(this.terminal,this.clasificacion.id).subscribe(recursos=>{
              this.tipo_recurso = recursos;
            },
            error => {},
            ()=>{
              this.filtrarRecursosTerminal()
            }
          )
        }
        else {
          this.cargarRecrusosNoSanitarios.getClasificacionRecursosEspecificos(this.clasificacion.id).subscribe( recursos =>{
              this.tipo_recurso_no_sanitarios = recursos;
            },
            error => {},
            ()=>{
              this.filtrarRecursosTerminal()
            })
        }
      }
    )
  }

  subirPost() {
    //OBJETO QUE SE MANDA A LA BD
    let post = {
      id_alarma: this.alarma.id,
      id_recurso_comunitario: this.formAnadir.value.tipo_recurso.id,
      fecha_registro: this.fechaActual(),
    }
    //PETICION POST
    this.cargarRecursosAlarma.nuevaRecursosComunitariosAlarma(post).subscribe(
      ()=>{
        //PETICION GET DE LOS RECURSOS QUE HAY EN LA ALARMA
        //Esto se hace para poder añadir el bloque del recurso que se ha añadido y para poder eliminar el recurso de la losta del select
        this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(this.alarma.id,this.clasificacion.id).subscribe(
          recursos_alarma=>{
            this.recursos_en_alarma = recursos_alarma;
          },
          error => {},
          ()=>{
            this.filtrarRecursosTerminal()
          })
        },
        error => {
        },
        () => {
           //Se pone a vacio el campo del select ya que se eliminara el recurso de él una vez se haya subido a la alarma
          this.formAnadir.get('tipo_recurso').setValue(null);
        });
  }
  borrarRecurso(objetoRecurso:IRecursosComunitariosAlarma,idBorrar:string){
    //ELIMINAR EL BLOQUE de RECURSO CORRESPONDIENTE
    let contenedor = document.getElementById(this.minusculas(idBorrar));
    contenedor.removeChild(document.getElementById(this.minusculas(objetoRecurso.id_recurso_comunitario.nombre)))
    //Peticion DELETE para eliminar el recurso de recursos_en_alarma
    this.cargarRecursosAlarma.eliminarRecursosComunitariosAlarma(objetoRecurso).subscribe(
      ()=>{
        this.actualizarContenido();
      }
    )
  }
  //Funcion que permite actualizar los valores del select segun los peticiones que se realicen.
  filtrarRecursosTerminal(){
    let arrayRecursosAlarma = this.recursos_en_alarma;
      for (let i = 0; i < arrayRecursosAlarma.length; i++) {
        // Comprobamos si la clasificaicón es Sanitario == 1
        if (this.clasificacion.id==1){
          this.tipo_recurso = this.tipo_recurso.filter(recurso => recurso.id_recurso_comunitario.id !== arrayRecursosAlarma[i].id_recurso_comunitario.id)
        }
        else {
          this.tipo_recurso_no_sanitarios = this.tipo_recurso_no_sanitarios.filter(recurso => recurso.id !== arrayRecursosAlarma[i].id_recurso_comunitario.id)
        }
      }
  }
  //Funcion para pobtener la fecha actual
  fechaActual(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let hora =fecha.getHours();
    let minutos =fecha.getMinutes();
    return`${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2,'0')}:${minutos.toString().padStart(2, '0')}`;
  }
  //Funcion para crear id correctos
  minusculas(texto:string){
    let procesado = texto.replace(/\s+/g, '')
    return procesado.toLowerCase();
  }




}
