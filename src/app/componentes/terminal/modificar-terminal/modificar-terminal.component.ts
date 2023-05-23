import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CargaTerminalesService } from "../../../servicios/terminal/carga-terminales.service";
import { Terminal } from "../../../clases/terminal";
import { Paciente } from "../../../clases/paciente";
import { TipoVivienda } from "../../../clases/tipo-vivienda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-modificar-terminal',
  templateUrl: './modificar-terminal.component.html',
  styleUrls: ['./modificar-terminal.component.scss']
})
export class ModificarTerminalComponent implements OnInit {

  public terminal: Terminal
  public idTerminal: number
  public titulares: Paciente[]
  public tipo_vivienda: TipoVivienda[]


  constructor(private route: ActivatedRoute, private titleService: Title, private router: Router, private cargarTerminales: CargaTerminalesService) { }

  ngOnInit(): void {
    this.terminal = this.route.snapshot.data['terminales'];
    this.idTerminal = this.route.snapshot.params['id'];
    this.titulares = this.route.snapshot.data['titulares'];
    this.tipo_vivienda = this.route.snapshot.data['tipo_vivienda']
  }
  optionSelected(i: number): void {
    document.getElementsByClassName('form-select')[i].setAttribute('selected', '');
  }

  modificarTerminal(): void {
    this.cargarTerminales.modificarTerminal(this.terminal).subscribe(
      e => {
        this.alertExito()
        this.router.navigate(['/terminales'])
      },
      error => {
        this.alertError()
      }
    )
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


