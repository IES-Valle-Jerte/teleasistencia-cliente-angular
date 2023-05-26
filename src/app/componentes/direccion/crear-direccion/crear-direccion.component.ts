import {Component, OnInit} from '@angular/core';
import {IDireccion} from '../../../interfaces/i-direccion';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaDireccionService} from '../../../servicios/carga-direccion.service';
import {Direccion} from '../../../clases/direccion';
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Spinner} from "../../../clases/spinner";



@Component({
  selector: 'app-crear-direccion',
  templateUrl: './crear-direccion.component.html',
  styleUrls: ['./crear-direccion.component.scss']
})

export class CrearDireccionComponent implements OnInit {
  public dire: IDireccion;

  constructor(private titleService: Title, private route: ActivatedRoute, private cargaDirecciones: CargaDireccionService, private router: Router) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Nueva dirección');
    this.dire = new Direccion();
  }

  nuevaDireccion(): void {
    Spinner.mostrarSpiner();
    this.cargaDirecciones.nuevaDireccion(this.dire).subscribe(
      e => {
        this.alertExito()
        this.router.navigate(['/direcciones']);
      },
      error => {
        this.alertError();
      }
    );
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
      title: environment.fraseCrear,
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
      title: environment.fraseErrorCrear
    })
  }
}
