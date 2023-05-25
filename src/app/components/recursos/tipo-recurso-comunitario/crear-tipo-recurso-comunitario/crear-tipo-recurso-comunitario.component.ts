import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ITipoRecursoComunitario} from '../../../../interfaces/i-tipo-recurso-comunitario';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaTipoRecursoComunitarioService} from '../../../../services/recursos/carga-tipo-recurso-comunitario.service';
import {TipoRecursoComunitario} from '../../../../clases/tipo-recurso-comunitario';
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-crear-tipo-recurso-comunitario',
  templateUrl: './crear-tipo-recurso-comunitario.component.html',
  styleUrls: ['./crear-tipo-recurso-comunitario.component.scss']
})

export class CrearTipoRecursoComunitarioComponent implements OnInit {
  public tipo_recurso_comunitario: ITipoRecursoComunitario | any;
  public tipos_recursos: ITipoRecursoComunitario[];
  public formCrearTipo: FormGroup;
  public id = this.route.snapshot.params['id'];
  @Output () actualizarRecurso = new EventEmitter;


  constructor(private titleService: Title, private route: ActivatedRoute, private cargaTiposRecursosComunitarios: CargaTipoRecursoComunitarioService,
              private router: Router, private formBuilder: FormBuilder,
              private cargaTipoRecursosComunitarios: CargaTipoRecursoComunitarioService) {
  }
  /*
   * Se crea el formulario con sus respectivas validaciones
   * al cargar la página
   */
  ngOnInit(): void {

    this.formCrearTipo = this.formBuilder.group({
      nombre: ['',Validators.maxLength(200)]
    })
  }

  nuevoTipoRecursoComunitario(): void {
    let idClasificacion = Number(this.id) // Utilizo el Number() para cambiar el valor de la id que hay en la url

    /*
    * Con la variable this.tipo_recurso_comunitario que es de tipo ITipoRecursoComunitario
    * La relleno tanto con el dato del formulario como con la id para especificar de que calsificación de recurso es*/
    this.tipo_recurso_comunitario = {
      nombre: this.formCrearTipo.controls['nombre'].value,
      id_clasificacion_recurso_comunitario: idClasificacion
    }

    this.cargaTiposRecursosComunitarios.nuevoTipoRecursoComunitario(this.tipo_recurso_comunitario).subscribe(
      e => {
        this.actualizarRecurso.emit(e.id);
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    );
  }

  // Este método nos retornará los controladores del formulario formCrearTipo
  get valorForm(){
    return this.formCrearTipo.controls;
  }

  //Este método se ejecutará al pulsar en volver para hacer desaparecer el formulario para crear un tipo de recurso
  mostrarCrearTipo(){
    this.actualizarRecurso.emit(null);
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
