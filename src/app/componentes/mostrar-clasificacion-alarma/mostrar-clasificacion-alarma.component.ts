import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CargaTipoAlarmaService} from "../../servicios/carga-tipo-alarma.service";
import {ITipoAlarma} from "../../interfaces/i-tipo-alarma";
import {CargaTerminalesService} from "../../servicios/terminal/carga-terminales.service";
import {
  CargaDispositivosAuxiliaresTerminalService
} from "../../servicios/dispositivos-auxiliares-terminal/carga-dispositivos-auxiliares-terminal.service";
import Swal from "sweetalert2";
import {environment} from "../../../environments/environment";
import {IDispositivosAuxiliaresTerminal} from "../../interfaces/i-dispositivos-auxiliares-terminal";

@Component({
  selector: 'app-mostrar-clasificacion-alarma',
  templateUrl: './mostrar-clasificacion-alarma.component.html',
  styleUrls: ['./mostrar-clasificacion-alarma.component.scss']
})
export class MostrarClasificacionAlarmaComponent implements OnInit {

  @Input() tipoPeticion: any;
  public tipoFormulario: ITipoAlarma[];
  public formulario: FormGroup;
  public dispositivosAuxiliares: IDispositivosAuxiliaresTerminal[];
  @Output() resultadoEleccion: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private clasificacion: CargaTipoAlarmaService,
              private terminal: CargaTerminalesService,
              private auxiliares: CargaDispositivosAuxiliaresTerminalService
  ) {
  }

  ngOnInit(): void {
    this.getDatos()
    this.buildForm();  //Formularios reactivos
  }

  private buildForm() {
    this.formulario = this.formBuilder.group({
      datos: ['', [Validators.required]]
    });
  }

  subirDatos() {
    if (this.formulario.value.nombre != null) {
      let datos;
      datos = {
        nombre: this.formulario.value.nombre,
        codigo: this.tipoPeticion.codigo
      }

      this.resultadoEleccion.emit(datos);
    }
  }

  getDatos() {
    this.clasificacion.getTipoAlarmaPorClasificacion(this.tipoPeticion.id).subscribe(
      peticion => {
        this.tipoFormulario = peticion;

      },
      error => {
        console.log(error)
      },
      () => {

      }
    )
  }

  pruebas(cosa) {
    console.log(cosa);
  }

  postAux() {
    let aux;
    aux = {
      id_terminal: this.terminal.idTerminal,
      id_tipo_alarma: this.formulario.value.datos.id
    }
    this.auxiliares.nuevoDispositivoAuxiliarTerminal(aux).subscribe(
      aux => {
        this.auxiliares.getDispositivos(aux.id_terminal.id, this.tipoPeticion.id).subscribe(
          e => {
            this.dispositivosAuxiliares = e
          },
          error => {
            this.alertError()
          },
          () => {
            this.filtrar()
            this.formulario.get('datos').setValue(null);

          },
        )

        this.alertExito();
      },
      error => {
        this.alertError();
        console.log(aux.id_tipo_alarma)
        console.log(aux.id_terminal);
      }
    )
  }

  borrarRecurso(objeto: IDispositivosAuxiliaresTerminal, id: string) {
    console.log(id)
    let contenedor = document.getElementById(id);
    console.log(objeto.id_tipo_alarma.nombre)
    contenedor.removeChild(document.getElementById(objeto.id_tipo_alarma.nombre)) // Aqui borramos el bloque del elemento que acabamos de borrar
    this.auxiliares.eliminarDispositivoAuxiliarTerminal(objeto).subscribe(
      oj => {
        this.auxiliares.getDispositivos(objeto.id_terminal.id, this.tipoPeticion.id).subscribe(
          e => {
            this.dispositivosAuxiliares = e;


            this.clasificacion.getTipoAlarmaPorClasificacion(this.tipoPeticion.id).subscribe(
              peticion => {
                this.tipoFormulario = peticion;
                this.filtrar();
              },
              error => {
                this.alertError();
              },
            )
          }
        )
      }
    )
  }


  filtrar() {
    for (let i = 0; i < this.dispositivosAuxiliares.length; i++) {
      this.tipoFormulario = this.tipoFormulario.filter(aux => aux.id !== this.dispositivosAuxiliares[i].id_tipo_alarma.id)/// filtrado de los elementos ya seleccionados debajo del ngSelect para que no aparezcan como seleccionables.
    }
  }


  /* Alertas */

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
