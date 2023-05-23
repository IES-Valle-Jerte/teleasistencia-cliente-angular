import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoVivienda} from "../../../interfaces/i-tipo-vivienda";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaViviendaService} from "../../../servicios/carga-vivienda.service";
import {TipoVivienda} from "../../../clases/tipo-vivienda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {TipoModalidadPaciente} from "../../../clases/tipo-modalidad-paciente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {CargaTerminalesService} from "../../../servicios/terminal/carga-terminales.service";
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-crear-tipo-vivienda',
  templateUrl: './crear-vivienda.component.html',
  styleUrls: ['./crear-vivienda.component.scss']
})
export class CrearViviendaComponent implements OnInit {
  public vivienda: ITipoVivienda | any;
  public listaViviendas: ITipoVivienda[];
  public formulario: FormGroup;
  public mostrar: boolean = false;
  public mostrarModificar: boolean = false;
  public plegado: boolean = false;
  public isAdmin: boolean;

  @Input() idPaciente: number;
  @Output() public plegar = new EventEmitter;
  @Output() public desplegar = new EventEmitter;


  /*Constantes*/

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cargaVivienda: CargaViviendaService,
              private formBuilder: FormBuilder,
              private paciente: CargaPacienteService,
              private terminal: CargaTerminalesService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.listaViviendas = this.route.snapshot.data['tipos_viviendas'];
    this.buildForm();  //Formularios reactivos
    this.isAdmin = this.auth.isAdmin();
  }

  contraer() {
    this.plegado = !this.plegado;
  }

  volver() {
    this.plegado = !this.plegado;
    this.desplegar.emit(true);
  }

  refresco() {
    this.actualizarViviendas(this.formulario.value.nombre);
  }


  /* formulario reactivo */
  private buildForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required],
      ],
      text_area: ['', [Validators.max(400)]],
      text_area2: ['', [Validators.max(400)]]
    });
  }

  nuevaVivienda(): void {
    this.cargaVivienda.idVivienda = this.formulario.value.nombre;
    let idTerminal = this.terminal.idTerminal;
    let datos;

    datos = {
      id_titular: this.paciente.idPaciente,
      modo_acceso_vivienda: this.formulario.value.text_area,
      barreras_arquitectonicas: this.formulario.value.text_area2,
      id_tipo_vivienda: this.formulario.value.nombre
    }


    this.terminal.modificarTerminalPorId(idTerminal, datos).subscribe(
      () => {
        this.alertExito()
        this.plegar.emit(false);

      },
      error => {
        this.alertError()
      }
    )
  }


  mostratCrearTipo() {
    this.mostrar = !this.mostrar;
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

  desactivado() {
    return (this.formulario.value.nombre == '') || (this.formulario.value.nombre == null);
  }

  modalConfirmacion(): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta vivienda?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarVivienda()
      }
    })
  }


  private eliminarVivienda() {
    this.cargaVivienda.borrarVivienda(this.formulario.value.nombre).subscribe(
      e => {
        this.formulario.get('nombre').setValue('');
        this.alertExitoBorrar()
      },
      error => {
        this.alertErrorBorrar()
      },
      () => {
        this.actualizarViviendas();
      }
    )
  }


  alertExitoBorrar(): void {
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
      title: environment.fraseEliminar,
    })
  }

  alertErrorBorrar(): void {
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
      title: environment.fraseErrorEliminar
    })
  }


  mostrarEditarTipo() {
    this.mostrarModificar = !this.mostrarModificar;
  }


  //FUNCION PARA REFRESACAR LOS TIPOS ADE ALARMA A TIEMPO REAL (SIN RECARGAR LA PAGINA)
  actualizarViviendas(id_tipo_vivienda = null) {
    //peticion para refrescar los tipos de alarmas
    this.cargaVivienda.getViviendas().subscribe(
      lista => {
        this.listaViviendas = lista;
        this.formulario.patchValue({nombre: id_tipo_vivienda})   // asigna directamente en el select el tipo creado a tiempo real
      },
      error => {
      },
    );
  }

}
