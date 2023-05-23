import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {CargaViviendaService} from "../../../servicios/carga-vivienda.service";

@Component({
  selector: 'app-nuevo-tipo-vivienda',
  templateUrl: './nuevo-tipo-vivienda.component.html',
  styleUrls: ['./nuevo-tipo-vivienda.component.scss']
})
export class NuevoTipoViviendaComponent implements OnInit {
  @Output() mostrar = new EventEmitter;
  @Output() refresco = new EventEmitter;
  public formulario: FormGroup;


  constructor(private titleService: Title, private route: ActivatedRoute,
              private cargaVivienda: CargaViviendaService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();  //Formularios reactivos
    this.formulario.value.nombre = "";

  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }


  nuevoTipoModalidadPaciente(): void {
    let tipo_vivienda;

    tipo_vivienda = {
      nombre: this.formulario.value.nombre
    }

    this.cargaVivienda.nuevaVivienda(tipo_vivienda).subscribe(
      e => {
        this.alertExito()
        this.mostrar.emit(!this.mostrar);
        this.refresco.emit(e.id)

      },
      error => {
        this.alertError()
      }
    );
  }


  mostratCrearTipo() {
    this.mostrar.emit(!this.mostrar);
  }

  get controls() {
    return this.formulario.controls;
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
