import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  Output,
  EventEmitter, Input
} from '@angular/core';
import {IDireccion} from "../../../interfaces/i-direccion";
import {IPaciente} from "../../../interfaces/i-paciente";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaPersonaService} from "../../../servicios/carga-persona.service";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {
  CargaRelacionPacientePersonaService
} from "../../../servicios/relacion-paciente-persona/carga-relacion-paciente-persona.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {MostrarEditarContactoComponent} from "../mostrar-editar-contacto/mostrar-editar-contacto.component";
import {CrearEditarContactoComponent} from "../crear-editar-contacto/crear-editar-contacto.component";

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.scss']
})
export class EditarContactoComponent implements AfterViewInit {

  @ViewChild('contenedorEditar', { read: ViewContainerRef }) container: ViewContainerRef; //Hace referencia al componente hijo y al contenedor del padre mediante un contenedor

  public idPaciente: number;
  public plegado: boolean = false;
  public indicesCrear = 1; //Comienzo con el primero indice
  public maximoComponentes : number = 5; //Maximo numero de componentes que crea al darle al boton de crearHTML()
  @Output() public plegar = new EventEmitter;
  @Output() public desplegar = new EventEmitter;
  @Input() public blockEditar;
  public direccion: IDireccion | any;
  public pacientes: IPaciente[] | any;
  public paciente: IPaciente | any;
  private componentesCreados: any[] = []; // Generamos un array de componentes para guardarlos posteriormente
  public opcion = false;
  public formulario: FormGroup | any;
  public lista = [];
  public generarIndices = 0;



  //EXPRESION REGULAR

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router,
              private  formBuilder: FormBuilder,
              private cargaPersonas: CargaPersonaService,
              private cargaDireccion: CargaDireccionService,
              private cargaPacientes: CargaPacienteService,
              private cargaRelacion: CargaRelacionPacientePersonaService) {
  }

ngAfterViewInit(): void{ //Metodo que hace que haga lo que me pida cuando u ncomponente ha cargado por completo

  this.cargaRelacion.getRelacionesPacientePersonaPorPaciente(this.cargaPacientes.idPacienteEditar).subscribe(
    relaciones => {
      for (let relacion of relaciones){
        this.crearHtml(relacion);

      }
    }
  )

}


  ngOnInit() {
  }


  contraer() {
    this.plegado = !this.plegado;
    this.plegar.emit(false);
  }
  volver(){
    this.desplegar.emit(true);

  }



  crearOtroFormulario(){ //Creo el HTML con FactoryResolvver, que sirve para poder crear diferentes componentes segun desee

    if (this.indicesCrear < this.maximoComponentes) { //Si el indice es menor al maximo de componentes, genera el mismo

      const componente = this.componentFactoryResolver.resolveComponentFactory(CrearEditarContactoComponent); //Usa el componente de mostrarCrear para crear el componente

      const componenteContacto = componente.create(this.container.injector); //Creo el componente justo en el contenedor


      componenteContacto.instance.indice = this.indicesCrear; //Instancio el indice que se usará para mostrar el numero de contacto
      componenteContacto.instance.idPaciente = this.cargaPacientes.idPacienteEditar; //Instancia la id delPaciente a la hora de crear el componente
      this.componentesCreados.push(componenteContacto); //Agregamos todos los componentes que vamos creando poco a poco

      this.indicesCrear++; //Aumento en 1 el indice a la hora de volver a crearlo de nuevo

      this.container.insert(componenteContacto.hostView); //Inserto en el contenedor el componente a la que la vista hace referencia

      componenteContacto.instance.onBorrarComponente.subscribe( //Hago el subscribe aqui ya que aquí creo el componente, solamente entra si le da al boton de borrar
        () => {
          const indiceTomado = componenteContacto.instance.indice; //Tomo el indice que voy a borrar como constante
          this.componentesCreados.splice(this.componentesCreados.indexOf(componenteContacto), 1); // Borramos el componente dado al boton
          this.borrarComponente(componenteContacto); //Borro el componente desde el que hace referencia
          for (const componente of this.componentesCreados) { //Recorremos todo el array generado y cambiamos el indice

            if ( componente.instance.indice > indiceTomado  ){ //Este if compara el indice tomado con los demas, si es superiore, resta a los que sean superiores al mismo
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


  crearHtml(relacion){ //Creo el HTML con FactoryResolvver, que sirve para poder crear diferentes componentes segun desee

    if (this.indicesCrear < this.maximoComponentes) { //Si el indice es menor al maximo de componentes, genera el mismo

      const componente = this.componentFactoryResolver.resolveComponentFactory(MostrarEditarContactoComponent); //Usa el componente de mostrarCrear para crear el componente

      const componenteContacto = componente.create(this.container.injector); //Creo el componente justo en el contenedor


      componenteContacto.instance.indice = this.indicesCrear; //Instancio el indice que se usará para mostrar el numero de contacto
      componenteContacto.instance.idPaciente = this.cargaPacientes.idPacienteEditar; //Instancia la id delPaciente a la hora de crear el componente
      componenteContacto.instance.relacionEditar = relacion;
      this.componentesCreados.push(componenteContacto); //Agregamos todos los componentes que vamos creando poco a poco

      this.indicesCrear++; //Aumento en 1 el indice a la hora de volver a crearlo de nuevo

      this.container.insert(componenteContacto.hostView); //Inserto en el contenedor el componente a la que la vista hace referencia

      componenteContacto.instance.onBorrarComponente.subscribe( //Hago el subscribe aqui ya que aquí creo el componente, solamente entra si le da al boton de borrar
        () => {
          const indiceTomado = componenteContacto.instance.indice; //Tomo el indice que voy a borrar como constante
          this.componentesCreados.splice(this.componentesCreados.indexOf(componenteContacto), 1); // Borramos el componente dado al boton
          this.borrarComponente(componenteContacto); //Borro el componente desde el que hace referencia
          for (const componente of this.componentesCreados) { //Recorremos todo el array generado y cambiamos el indice

            if ( componente.instance.indice > indiceTomado  ){ //Este if compara el indice tomado con los demas, si es superiore, resta a los que sean superiores al mismo
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
  alertNoContactos() :void {
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
