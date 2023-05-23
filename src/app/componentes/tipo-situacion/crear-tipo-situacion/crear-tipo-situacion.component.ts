import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaTipoSituacionService} from "../../../servicios/carga-tipo-situacion.service";
import {ITipoSituacion} from "../../../interfaces/i-tipo-situacion";
import {TipoSituacion} from "../../../clases/tipo-situacion";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-crear-tipo-situacion',
  templateUrl: './crear-tipo-situacion.component.html',
  styleUrls: ['./crear-tipo-situacion.component.scss']
})
export class CrearTipoSituacionComponent implements OnInit {
  @Output() mostrar = new EventEmitter;
  @Output() refresco = new EventEmitter;

  public formulario: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cargaSituacion: CargaTipoSituacionService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();  //Formularios reactivos
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }


  get controls() {
    return this.formulario.controls;
  }

  mostratCrearTipo() {
    this.mostrar.emit(!this.mostrar);
  }

  nuevaSituacion(): void {

    let tipo_situacion;

    tipo_situacion = {
      nombre: this.formulario.value.nombre
    }
    console.log("tipo situacion -->" + tipo_situacion)

    this.cargaSituacion.nuevoTipoSituacion(tipo_situacion).subscribe(
      e => {
        this.mostrar.emit(!this.mostrar);
        this.refresco.emit(e.id);
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    );
  }

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
