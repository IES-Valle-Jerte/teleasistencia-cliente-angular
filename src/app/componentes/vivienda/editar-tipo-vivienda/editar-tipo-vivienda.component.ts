import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoVivienda} from "../../../interfaces/i-tipo-vivienda";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaViviendaService} from "../../../servicios/carga-vivienda.service";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {CargaTerminalesService} from "../../../servicios/terminal/carga-terminales.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {IPaciente} from "../../../interfaces/i-paciente";
import {AuthService} from "../../../servicios/auth.service";

@Component({
  selector: 'app-editar-tipo-vivienda',
  templateUrl: './editar-tipo-vivienda.component.html',
  styleUrls: ['./editar-tipo-vivienda.component.scss']
})
export class EditarTipoViviendaComponent implements OnInit {
  @Output() public plegar = new EventEmitter;
  @Output() public desplegar = new EventEmitter;
  @Input() public blockEditar;

  public vivienda: ITipoVivienda | any;
  public listaViviendas: ITipoVivienda[];
  public formularioVivienda: FormGroup;
  public mostrar: boolean = false;
  public mostrarModificar: boolean = false;
  public pacienteEditar: IPaciente|any;
  public plegado: boolean = false;
  public isAdmin: boolean;
  public id_tipo: number;

  @Input() idPaciente: number;


  /*Constantes*/

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cargaVivienda: CargaViviendaService,
              private formBuilder: FormBuilder,
              private paciente: CargaPacienteService,
              private terminal: CargaTerminalesService,
              private auth: AuthService
  ) {
  }

  cambiarId(){
    this.id_tipo = this.formularioVivienda.get('nombre').value;
    this.formularioVivienda.get('id_tipo').setValue(this.id_tipo);
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


  /* formulario reactivo */
  private buildForm() {
    this.formularioVivienda = this.formBuilder.group({
      nombre: ['', [Validators.required],
      ],
      text_area: ['', [Validators.max(400)]],
      text_area2: ['', [Validators.max(400)]],
      id_tipo:['']
    });
    this.paciente.getPaciente(this.paciente.idPacienteEditar).subscribe(
      paciente => {
        this.pacienteEditar = paciente;
        this.formularioVivienda.patchValue({
          nombre: this.pacienteEditar.id_terminal.id_tipo_vivienda.nombre,
          text_area: this.pacienteEditar.id_terminal.modo_acceso_vivienda,
          text_area2: this.pacienteEditar.id_terminal.barreras_arquitectonicas,
          id_tipo: this.pacienteEditar.id_terminal.id_tipo_vivienda.id
        })
      }
      )

  }

  nuevaVivienda(): void {

    let datos;

    datos = {
      id_titular: this.pacienteEditar.id,
      modo_acceso_vivienda: this.formularioVivienda.value.text_area,
      barreras_arquitectonicas: this.formularioVivienda.value.text_area2,
      id_tipo_vivienda: this.formularioVivienda.value.id
    }

    this.terminal.modificarTerminalPorId(this.pacienteEditar.id_terminal.id, datos).subscribe(
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
      title: environment.fraseErrorCrear
    })
  }

  desactivado() {
    return (this.formularioVivienda.value.nombre == '') || (this.formularioVivienda.value.nombre == null);
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
    this.cargaVivienda.borrarVivienda(this.formularioVivienda.value.nombre).subscribe(
      e => {
        this.formularioVivienda.get('nombre').setValue('');
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
        this.formularioVivienda.patchValue({tipo_vivienda: id_tipo_vivienda})   // asigna directamente en el select el tipo creado a tiempo real
      },
      error => {
      },
    );
  }



}
