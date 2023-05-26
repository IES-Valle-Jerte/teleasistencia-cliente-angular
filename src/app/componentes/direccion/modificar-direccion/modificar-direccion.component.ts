import {Component, OnInit} from '@angular/core';
import {IDireccion} from '../../../interfaces/i-direccion';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CargaDireccionService} from '../../../servicios/carga-direccion.service';
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Spinner} from "../../../clases/spinner";

@Component({
  selector: 'app-modificar-direccion',
  templateUrl: './modificar-direccion.component.html',
  styleUrls: ['./modificar-direccion.component.scss']
})

export class ModificarDireccionComponent implements OnInit {
  public dire: IDireccion;
  public idDireccion: number;

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaDirecciones: CargaDireccionService, private router: Router) {
  }

  ngOnInit(): void {
    this.idDireccion = this.route.snapshot.params['id'];
    this.dire = this.route.snapshot.data['direccion'];
    this.titleService.setTitle('Modificar dirección ' + this.idDireccion);

    console.log(this.titleService);
  }

  modificarDireccion(): void {
    Spinner.mostrarSpiner();
    this.cargaDirecciones.modificarDireccion(this.dire).subscribe(
      e => {
        setTimeout(() => {
        }, 200);
        this.router.navigate(['/direcciones']);
        this.alertExito()
      },
      error => {
        this.alertError()
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
      title: environment.fraseModificar,
    })
    Spinner.ocultarSpinner();
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
    Spinner.ocultarSpinner();
  }
}
