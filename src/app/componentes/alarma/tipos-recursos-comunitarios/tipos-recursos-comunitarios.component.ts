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

@Component({
  selector: 'app-tipos-recursos-comunitarios',
  templateUrl: './tipos-recursos-comunitarios.component.html',
  styleUrls: ['./tipos-recursos-comunitarios.component.scss']
})
export class TiposRecursosComunitariosComponent implements OnInit {

  constructor(private cargarRecursosAlarma:CargaRecursosComunitariosAlarmaService,private route: ActivatedRoute,private cargaRecursoTerminal: CargaRelacionTerminalRecursosComunitariosService,private formBuilder:FormBuilder) { }
  @Input() clasificacion:IClasificacioRecurso;
  public tipo_recurso:IRelacionTerminalRecursoComunitarios[];
  public recursos_en_alarma:IRecursosComunitariosAlarma[];
  @Input() terminal:number;
  public formAnadir:FormGroup;
  @Input() alarma:IAlarma;



  ngOnInit(): void {
    this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(this.alarma.id,this.clasificacion.id).subscribe(
      recursos_alarma=>{
        this.recursos_en_alarma = recursos_alarma;
        },
         error => {},
      ()=>{
        this.cargaRecursoTerminal.getRecursosComunitarioClasificacion(this.terminal,this.clasificacion.id).subscribe(recursos=>{
            this.tipo_recurso = recursos;
          },
          error => {},
          ()=>{
            this.filtrarRecursosTerminal()
          }
        )

      }
    )

    //Formulario
    this.formAnadir = this.formBuilder.group({
      tipo_recurso:['',Validators.required]
    })

  }
  subirPost() {
    //OBJETO QUE SE MANDA A LA BD
    let post = {
      id_alarma: this.alarma.id,
      id_recurso_comunitario: this.formAnadir.value.tipo_recurso.id_recurso_comunitario.id,
      fecha_registro: this.fechaActual(),
    }
    //PETICION POST
    this.cargarRecursosAlarma.nuevaRecursosComunitariosAlarma(post).subscribe(
      ()=>{
        //PETICION GET DE LOS RECURSOS QUE HAY EN LA ALARMA
        //Esto se hace para poder añadir el bloque del recurso que se ha añadido y para poder eliminar el recurso de la losta del select
        this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(this.alarma.id,this.clasificacion.id).subscribe(recursos=>{
            this.recursos_en_alarma = recursos;
          },
          error => {},
          ()=>{
            //Esta se encargan de filtrar los recursos
            //Un ejemplo es que si "Bomberos Mejostilla" esta en la lista del select no puede estar en los recursos de alarma
            this.filtrarRecursosTerminal();
            //Se pone a vacio el campo del select ya que se eliminara el recurso de él una vez se haya subido a la alarma
            this.formAnadir.get('tipo_recurso').setValue(null);
            })
      },
    )
  }
  borrarRecurso(objetoRecurso:IRecursosComunitariosAlarma,idBorrar:string){
    //ELIMINAR EL BLOQUE de RECURSO CORRESPONDIENTE
    let contenedor = document.getElementById(this.minusculas(idBorrar));
    contenedor.removeChild(document.getElementById(this.minusculas(objetoRecurso.id_recurso_comunitario.nombre)))
    //Peticion DELETE para eliminar el recurso de recursos_en_alarma
    this.cargarRecursosAlarma.eliminarRecursosComunitariosAlarma(objetoRecurso).subscribe(
      ()=>{
        //Peticion para traer de nuevo mediante GET los recursos_en_alarma
        this.cargarRecursosAlarma.getRecursoComunitarioAlarmaSegunId(this.alarma.id,this.clasificacion.id).subscribe(recursos=>{
            this.recursos_en_alarma = recursos;
            //Peticion para traer de nuevo mediante GET los recursos_en_terminal y actualizar el select
            this.cargaRecursoTerminal.getRecursosComunitarioClasificacion(this.terminal,this.clasificacion.id).subscribe(recursos=>{
                this.tipo_recurso = recursos;
                //Se llama a esta funcion para filtrar los distintos campos del select
                this.filtrarRecursosTerminal()
              })
          })
      }
    )
  }
  //Funcion que permite actualizar los valores del select segun los peticiones que se realicen.
  filtrarRecursosTerminal(){
    let arrayRecursosAlarma = this.recursos_en_alarma;
      for (let i = 0; i < arrayRecursosAlarma.length; i++) {
        this.tipo_recurso = this.tipo_recurso.filter(recurso => recurso.id_recurso_comunitario.id !== arrayRecursosAlarma[i].id_recurso_comunitario.id)
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
