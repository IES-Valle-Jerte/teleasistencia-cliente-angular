import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoSituacion} from "../../../interfaces/i-tipo-situacion";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CargaTipoSituacionService} from "../../../servicios/carga-tipo-situacion.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {ITipoModalidadPaciente} from "../../../interfaces/i-tipo-modalidad-paciente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modificar-tipo-situacion',
  templateUrl: './modificar-tipo-situacion.component.html',
  styleUrls: ['./modificar-tipo-situacion.component.scss']
})
export class ModificarTipoSituacionComponent implements OnInit {
  public tipo_situacion: any;
  public idSituacion: number;
  @Output() public mostrarModificar = new EventEmitter;
  @Input() public listaTiposSituaciones: ITipoSituacion[];
  @Input() public idTipoSituacion: number;
  public formulario: FormGroup;


  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private cargaSituacion: CargaTipoSituacionService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buscarTipoSituacion();
    this.formulario = this.formBuilder.group({
      nombre: [this.tipo_situacion.nombre, [Validators.required, Validators.max(200)]]
    });  //Formularios reactivos
  }

  modificarTipoSituacion(): void {

    let tipo_situacion = {
      id: this.tipo_situacion.id,
      nombre: this.formulario.value.nombre
    }

    this.cargaSituacion.modificarTipoSituacion(tipo_situacion).subscribe(
      e => {
        this.mostrarModificar.emit(!this.mostrarModificar);
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
      title: environment.fraseModificar,
    })
  }

  /* Getters del Formulario reactivo para los banners de error */
  get controles() {
    return this.formulario.controls;
  }

  buscarTipoSituacion() {
    let enc = false;
    let i = 0;
    while ((i < this.listaTiposSituaciones.length) && (enc == false)) {
      if (this.listaTiposSituaciones[i].id == this.idTipoSituacion) {
        enc = true;
        this.tipo_situacion = this.listaTiposSituaciones[i];
      }
      i++;
    }
  }


  mostrarModificarTipo() {
    this.mostrarModificar.emit(!this.mostrarModificar);
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


}
