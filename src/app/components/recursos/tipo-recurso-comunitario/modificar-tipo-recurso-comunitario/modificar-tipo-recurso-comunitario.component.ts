import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoRecursoComunitario} from '../../../../interfaces/i-tipo-recurso-comunitario';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CargaTipoRecursoComunitarioService} from '../../../../services/recursos/carga-tipo-recurso-comunitario.service';
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup,Validators} from "@angular/forms";


@Component({
  selector: 'app-modificar-tipo-recurso-comunitario',
  templateUrl: './modificar-tipo-recurso-comunitario.component.html',
  styleUrls: ['./modificar-tipo-recurso-comunitario.component.scss']
})

export class ModificarTipoRecursoComunitarioComponent implements OnInit {
  public tipo_recurso_comunitario: ITipoRecursoComunitario;
  public formModificarTipo: FormGroup;
  @Output() actualizarRecurso = new EventEmitter;
  @Input() TipoRecurso: ITipoRecursoComunitario[];
  @Input() public idTipoRecursoComunitario: number;

  constructor(private route: ActivatedRoute, private titleService: Title,
              private cargaTiposRecursosComunitarios: CargaTipoRecursoComunitarioService, private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buscarTipoRecurso()

    // Creamos el formulario correspondiente
    this.formModificarTipo = this.formBuilder.group({
      nombre: [this.tipo_recurso_comunitario.nombre,[Validators.maxLength(200)]]
    })
  }

  modificarTipoRecursoComunitario(): void {
    this.tipo_recurso_comunitario.nombre = this.formModificarTipo.controls['nombre'].value;

    this.cargaTiposRecursosComunitarios.modificarTipoRecursoComunitario(this.tipo_recurso_comunitario).subscribe(
      e => {
        this.alertExito()
        this.actualizarRecurso.emit(e.id)
      },
      error => {
        this.alertError()
      }
    );
  }
  // Este método nos retornará los controladores del formulario formCrearTipo
  get valorForm(){
    return this.formModificarTipo.controls;
  }

  //Este método se ejecutará al pulsar en volver para hacer desaparecer el formulario para crear un tipo de recurso
  mostrarCrearTipo(){
    this.actualizarRecurso.emit(null);
  }

  buscarTipoRecurso(){
    let enc = false;
    let i = 0;
    // Si no parseamos el idTipoRecursoComunitario a number no encontrara el elemento
    let idTipoNumber = Number(this.idTipoRecursoComunitario);

    while((i < this.TipoRecurso.length) && (enc == false)){
      if(this.TipoRecurso[i].id === idTipoNumber){
        enc = true;
        this.tipo_recurso_comunitario = this.TipoRecurso[i];
      }
      i++;
    }
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

}
