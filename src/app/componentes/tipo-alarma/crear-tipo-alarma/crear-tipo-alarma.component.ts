import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoAlarma} from '../../../interfaces/i-tipo-alarma';
import {IClasificacionAlarma} from '../../../interfaces/i-clasificacion-alarma';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaTipoAlarmaService} from '../../../servicios/carga-tipo-alarma.service';
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoAlarma} from "../../../clases/tipo-alarma";


@Component({
  selector: 'app-crear-tipo-alarma',
  templateUrl: './crear-tipo-alarma.component.html',
  styleUrls: ['./crear-tipo-alarma.component.scss']
})

export class CrearTipoAlarmaComponent implements OnInit {
  public tipo_alarma: ITipoAlarma;
  public opcion: boolean = true;
  public clasificaciones_alarmas: IClasificacionAlarma[];
  @Output () mostrar = new EventEmitter;
  @Output () tipos_alarmas = new EventEmitter;
  @Output () alarma_creada= new EventEmitter;
  @Input () listaTiposAlarma: ITipoAlarma[];
  public formCrear: FormGroup;
  public tipoAlarma: TipoAlarma;

  constructor(private titleService: Title, private route: ActivatedRoute, private cargaTiposAlarmas: CargaTipoAlarmaService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCrear = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.maxLength(200)]],
      codigo:['',[Validators.required,Validators.maxLength(200)]],
      es_dispositivo:[true,Validators.required],
      id_clasificacion_alarma:['',Validators.required],
    });
    this.clasificaciones_alarmas = this.route.snapshot.data['clasificaciones_alarmas'];
  }
  get f(){
    return this.formCrear.controls;
  }
  //Funcion para eleccion si es un dispositivo ( SI O NO)
  elegirOpcion(opcion){
    if(!opcion){
      this.opcion = false;
    }else {
      this.opcion = true;
    }
  }
  nuevoTipoAlarma(): void {
    this.cargaTiposAlarmas.nuevoTipoAlarma(this.formCrear.value).subscribe(
      e => {
        //Recargar los tipos de alarma mediante OUTPUT
        this.alarma_creada.emit(e.id);
        this.mostrar.emit(!this.mostrar);
        this.alertExito()
      },
      error => {
        this.alertError()
      },
      ()=>{
        //Reseteamos el formulario<para que quede vacio
        this.formCrear.reset();
        //Establecemos de nuevo al boton de SI el valor true
        this.formCrear.get('es_dispositivo').setValue(true);
        //Ponemos la la varible a true para que aparezca sin opacity
        this.opcion = true;
        console.log("VALOR ES_DIPSOSITIVO"+this.formCrear.value.es_dispositivo);
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

  mostratCrearTipo(){
    this.mostrar.emit(!this.mostrar);
  }
}
