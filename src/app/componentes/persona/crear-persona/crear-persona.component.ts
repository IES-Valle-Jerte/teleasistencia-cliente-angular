import {Component, OnInit} from '@angular/core';
import {IPersona} from '../../../interfaces/i-persona';
import {IDireccion} from '../../../interfaces/i-direccion';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CargaPersonaService} from '../../../servicios/carga-persona.service';
import {Persona} from '../../../clases/persona';
import Swal from "sweetalert2";
import {Direccion} from "../../../clases/direccion";
import {CargaDireccionService} from "../../../servicios/carga-direccion.service";
import {environment} from "../../../../environments/environment";



@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})

export class CrearPersonaComponent implements OnInit {
  public persona: IPersona;
  //public direcciones: IDireccion[];
  public fecha_actual = new Date();
  public anno_actual = this.fecha_actual.getFullYear();
  public mes_actual = this.fecha_actual.getMonth() + 1;
  public dia_actual = this.fecha_actual.getDate();
  public dire : IDireccion;

  constructor(private titleService: Title, private route: ActivatedRoute, private cargaPersonas: CargaPersonaService, private router: Router, private cargaDirecciones : CargaDireccionService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Crear nueva persona');
    this.persona = new Persona();
    //this.direcciones = this.route.snapshot.data['direcciones'];
    this.persona.sexo = 'Hombre';
    this.persona.telefono_fijo = '';
    this.persona.telefono_movil = '';
    this.dire = new Direccion();
  }
  nuevaDireccion(): void {
    this.cargaDirecciones.nuevaDireccion(this.dire).subscribe(
      e => {
        this.router.navigate(['/personas']);
      },
      error => {
        console.log(error);
      }
    );
  }

  nuevaPersona(): void {
    this.persona.id_direccion = this.dire;
    this.cargaPersonas.nuevaPersona(this.persona).subscribe(
      e => {
        // this.nuevaDireccion();
        this.alertExito()
        this.router.navigate(['/personas']);
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
