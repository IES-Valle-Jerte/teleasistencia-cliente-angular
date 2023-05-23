import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ITipoModalidadPaciente} from '../../../interfaces/i-tipo-modalidad-paciente';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaTipoModalidadPacienteService} from '../../../servicios/carga-tipo-modalidad-paciente.service';
import {TipoModalidadPaciente} from '../../../clases/tipo-modalidad-paciente';
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPersona} from "../../../interfaces/i-persona";
import {IDireccion} from "../../../interfaces/i-direccion";


@Component({
  selector: 'app-crear-tipo-modalidad-paciente',
  templateUrl: './crear-tipo-modalidad-paciente.component.html',
  styleUrls: ['./crear-tipo-modalidad-paciente.component.scss']
})

export class CrearTipoModalidadPacienteComponent implements OnInit {
  @Output() mostrar = new EventEmitter;
  @Output() refresco = new EventEmitter;
  public formulario: FormGroup;


  constructor(private route: ActivatedRoute, private cargaTiposModalidadesPacientes: CargaTipoModalidadPacienteService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();  //Formularios reactivos

  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }


  nuevoTipoModalidadPaciente(): void {
    let tipo_modalidad_paciente;

    tipo_modalidad_paciente = {
      nombre: this.formulario.value.nombre
    }

    this.cargaTiposModalidadesPacientes.nuevoTipoModalidadPaciente(tipo_modalidad_paciente).subscribe(
      e => {
        this.alertExito()
        this.mostrar.emit(!this.mostrar);
        this.refresco.emit(e.id);

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
