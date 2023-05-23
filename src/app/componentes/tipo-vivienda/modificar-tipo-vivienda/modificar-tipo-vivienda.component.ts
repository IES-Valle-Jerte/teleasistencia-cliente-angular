import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaViviendaService} from "../../../servicios/carga-vivienda.service";
import {ITipoVivienda} from "../../../interfaces/i-tipo-vivienda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {ITipoModalidadPaciente} from "../../../interfaces/i-tipo-modalidad-paciente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modificar-tipo-vivienda',
  templateUrl: './modificar-tipo-vivienda.component.html',
  styleUrls: ['./modificar-tipo-vivienda.component.scss']
})
export class ModificarTipoViviendaComponent implements OnInit {
  @Output() public mostrarModificar = new EventEmitter;
  @Input() public listaViviendas: ITipoModalidadPaciente[];
  @Input() public idVivienda: number;

  public formulario: FormGroup;
  public tipo_vivienda: ITipoVivienda;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private cargaViviendas: CargaViviendaService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buscarVivienda()
    this.formulario = this.formBuilder.group({
      nombre: [this.tipo_vivienda.nombre, [Validators.required]]
    });  //Formularios reactivos
  }

  modificarVivienda(): void {
    let vivienda = {
      id: this.idVivienda,
      nombre: this.formulario.value.nombre
    }
    this.cargaViviendas.modificarTipoVivienda(vivienda).subscribe(
      e => {
        this.mostrarModificar.emit(!this.mostrarModificar);
        this.alertExito()
      },
      error => {
        this.alertError()
      }
    );
  }

  mostrarModificarTipo() {
    this.mostrarModificar.emit(!this.mostrarModificar);
  }

  buscarVivienda() {
    let enc = false;
    let i = 0;
    while ((i < this.listaViviendas.length) && (enc == false)) {
      if (this.listaViviendas[i].id == this.idVivienda) {
        enc = true;
        this.tipo_vivienda = this.listaViviendas[i];
      }
      i++;
    }
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


}
