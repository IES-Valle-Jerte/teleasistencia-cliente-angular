import {Component, OnInit} from '@angular/core';
import {IRecursoComunitario} from '../../../../interfaces/i-recurso-comunitario';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CargaDireccionService} from '../../../../servicios/carga-direccion.service';
import {CargaRecursoComunitarioService} from '../../../../services/recursos/carga-recurso-comunitario.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CargaTipoRecursoComunitarioService} from "../../../../services/recursos/carga-tipo-recurso-comunitario.service";
import {IDireccion} from "../../../../interfaces/i-direccion";
import {ITipoRecursoComunitario} from "../../../../interfaces/i-tipo-recurso-comunitario";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import {IClasificacioRecurso} from "../../../../interfaces/i-clasificacio-recurso";
import {CargarClasificacionRecursosService} from "../../../../services/recursos/cargar-clasificacion-recursos.service";

@Component({
  selector: 'app-modificar-recurso-comunitario',
  templateUrl: './modificar-recurso-comunitario.component.html',
  styleUrls: ['./modificar-recurso-comunitario.component.scss']
})

export class ModificarRecursoComunitarioComponent implements OnInit {
  public recurso_comunitario: IRecursoComunitario | any;
  public idRecursoComunitario: number;

  // Variables en las que almacenaremos la información obtenida del formulario
  public tipo_recurso: ITipoRecursoComunitario[] | any;
  public dire: IDireccion | any;

  // Variables utilizadas para mostrar en los values, utilizando un resolve
  public tipos_recursos_comunitarios: any;
  public direccion: any;

  //Con esta variable obtendremos la id de
  public id: number;

  editarRecurso: FormGroup | any;

  //  Muestra la clasificación del recurso
  public clasificacion: IClasificacioRecurso | any;


  constructor(private route: ActivatedRoute, private titleService: Title,
              private cargaDirecciones: CargaDireccionService, private cargaRecursosComunitarios: CargaRecursoComunitarioService,
              private cargaTipoRecurso: CargaTipoRecursoComunitarioService, private router: Router,
              private formBuilder: FormBuilder,
              private cargaClasificacion: CargarClasificacionRecursosService) {
  }


  ngOnInit(): void {
    // Mediante un resolve obtenemos los valores para el recurso comunitario, tipo de recurso, direccion
    this.recurso_comunitario = this.route.snapshot.data['recurso_comunitario'];
    this.tipo_recurso = this.route.snapshot.data['tipos_recursos_comunitarios'];
    this.direccion = this.recurso_comunitario.id_direccion;
    this.idRecursoComunitario = this.recurso_comunitario.id;

    // Esta id será utilizada para volver a la página principal acorde a la clasificación de recurso comunitario
    this.id = this.recurso_comunitario.id_tipos_recurso_comunitario.id_clasificacion_recurso_comunitario;

    this.cargaTipoRecurso.getTipoRecursoComunitarioClasificacion(this.id).subscribe(
      tipo =>{
        this.tipos_recursos_comunitarios = tipo;
      },
      error => {}
    );
    
    this.cargaClasificacion.getClasificacionRecursoComunitario(this.id).subscribe(
      clasificacion =>{
        this.clasificacion = clasificacion;
      },error => {
        console.log(error)
      }
    )

    /* Creamos los valores del formulario
     * Con la palabra reservada Validators creamos la validación de los valores
     * */
    this.editarRecurso = this.formBuilder.group({
      nombre: [this.recurso_comunitario.nombre,[
        Validators.required,
        Validators.maxLength(500)
      ]],
      telefono: [this.recurso_comunitario.telefono,[
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern("^[9|6|7]{1}[ ]*([0-9][ ]*){8}$")
      ]],
      clasificacion_recursos_comunitario: [this.recurso_comunitario.id_tipos_recurso_comunitario.id,[
        Validators.required
      ]],
      localidad: [this.recurso_comunitario.id_direccion.localidad, [
        Validators.required,
        Validators.maxLength(200)
      ]],
      provincia: [this.recurso_comunitario.id_direccion.provincia, [
        Validators.required,
        Validators.maxLength(200)
      ]],
      direccion: [this.recurso_comunitario.id_direccion.direccion, [
        Validators.required,
        Validators.maxLength(200)
      ]],
      cd: [this.recurso_comunitario.id_direccion.codigo_postal, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern("[0-9]+$")
      ]]
      }
    )
  }

  get valorForm(){
    return this.editarRecurso.controls;
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

  /*
  * Cogemos los valores del formulario creado, los ponemos en un objeto JSON que será enviado al modificarRecursoComunitario,
  * Después se redirigirá a la página principal */
  modificarRecursoComunitario(): void {

    this.dire = {
      id: this.recurso_comunitario.id_direccion.id,
      localidad: this.editarRecurso.controls['localidad'].value,
      provincia: this.editarRecurso.controls['provincia'].value,
      direccion: this.editarRecurso.controls['direccion'].value,
      codigo_postal: this.editarRecurso.controls['cd'].value
    }

    this.recurso_comunitario = {
      nombre: this.editarRecurso.controls['nombre'].value,
      telefono: this.editarRecurso.controls['telefono'].value,
      id_tipos_recurso_comunitario: this.editarRecurso.controls['clasificacion_recursos_comunitario'].value,
      id_direccion: this.dire
    }

    this.id = this.buscarClasificacionRecurso(this.recurso_comunitario);

    this.cargaRecursosComunitarios.modificarRecursoComunitario(this.recurso_comunitario, this.idRecursoComunitario).subscribe(
      e => {
        this.alertExito()
        this.router.navigate(['/recursos_comunitarios/listar/'+this.id])
      },
      error => {
        this.alertError()
      }
    );
  }

  // Realizamos una búsqueda para buscar la id de la clasificación de recurso comunitario, para poder redireccionar a la página principal
  buscarClasificacionRecurso(recurso_comunitario): number {
    let enc = false;
    let i = 0;
    let id;
    while(( i < this.tipo_recurso.length) && (enc == false)){
      if(this.tipo_recurso[i].id === recurso_comunitario.id_tipos_recurso_comunitario){
        enc = true;
        id = this.tipo_recurso[i].id_clasificacion_recurso_comunitario;
      }
      i++;
    }

    return id;
  }

}
