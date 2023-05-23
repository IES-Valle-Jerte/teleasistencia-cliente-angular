import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoModalidadPaciente} from '../../../interfaces/i-tipo-modalidad-paciente';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CargaTipoModalidadPacienteService} from '../../../servicios/carga-tipo-modalidad-paciente.service';
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-modificar-tipo-modalidad-paciente',
  templateUrl: './modificar-tipo-modalidad-paciente.component.html',
  styleUrls: ['./modificar-tipo-modalidad-paciente.component.scss']
})

export class ModificarTipoModalidadPacienteComponent implements OnInit {
  @Output() public mostrarModificar = new EventEmitter;
  @Input() public listaTiposModalidad: ITipoModalidadPaciente[];
  @Input() public idTipoModalidad: number;


  public formulario: FormGroup;
  public tipo_modalidad: any;


  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private cargaTiposModalidadesPacientes: CargaTipoModalidadPacienteService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buscarTipoModalidad();
    this.formulario = this.formBuilder.group({
      nombre: [this.tipo_modalidad.nombre, [Validators.required]]
    });  //Formularios reactivos
  }

  modificarTipoModalidadPaciente(): void {

    let tipo_modalidad_paciente = {
      id: this.tipo_modalidad.id,
      nombre: this.formulario.value.nombre
    }


    this.cargaTiposModalidadesPacientes.modificarTipoModalidadPaciente(tipo_modalidad_paciente).subscribe(
      e => {
        this.mostrarModificar.emit(!this.mostrarModificar);
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    );
  }

  /* Getters del Formulario reactivo para los banners de error */
  get controles() {
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
      title: environment.fraseModificar,
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
      title: environment.fraseErrorModificar
    })
  }

  buscarTipoModalidad() {
    let enc = false;
    let i = 0;
    while ((i < this.listaTiposModalidad.length) && (enc == false)) {
      if (this.listaTiposModalidad[i].id == this.idTipoModalidad) {
        enc = true;
        this.tipo_modalidad = this.listaTiposModalidad[i];
      }
      i++;
    }
  }

  mostrarModificarTipo() {
    this.mostrarModificar.emit(!this.mostrarModificar);
  }

}
