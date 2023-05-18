import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITipoAgenda} from "../../../interfaces/i-tipo-agenda";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CargaTipoAgendaService} from "../../../servicios/carga-tipo-agenda.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-detalles-tipo-agenda',
  templateUrl: './detalles-tipo-agenda.component.html',
  styleUrls: ['./detalles-tipo-agenda.component.scss']
})
export class DetallesTipoAgendaComponent implements OnInit {

  @Input () idTipo: number | any;
  public tipo_agenda: ITipoAgenda;
  @Input () tipos_agenda: ITipoAgenda[];
  /*public idTipoAgenda: number;*/
  public importanciaArray = ['Alta', 'Baja'];
  public modTipo: FormGroup;
  public submitted = false;
  public mostrar = false;
  @Output () tipoMod= new EventEmitter<ITipoAgenda>();
  @Output () mostrarEditarTipo= new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private titleService: Title, private cargaTipoAgendaService: CargaTipoAgendaService, private router: Router, private formBuilder: FormBuilder) {
  }

  // Carga de los datos para que se muestren correctamente en el formulario a la hora de modificar un tipo de agenda.
  ngOnInit(): void {
    /*this.tipo_agenda = this.route.snapshot.data['tipo_agenda'];
    this.idTipoAgenda = this.route.snapshot.params['id'];
    this.titleService.setTitle('Modificar tipo agenda ' + this.idTipoAgenda);
    this.tipos_agenda = this.route.snapshot.data['tipos_agenda'];*/
    this.crearForm();
  }

  //Método en el que se inicializan los campos del formulario con los valores del objeto a modificar
  crearForm() {
    this.tipo_agenda = this.tipos_agenda.find(tipo => tipo.id == this.idTipo);
    this.modTipo = this.formBuilder.group({
      nombre: [this.tipo_agenda.nombre, [
        Validators.required,
        Validators.maxLength(64)
      ]],
      codigo: [this.tipo_agenda.codigo, [
        Validators.required,
        Validators.maxLength(64)
      ]],
      importancia: [this.tipo_agenda.importancia, [
        Validators.required
      ]]
    })
  }

  //Método para obtener los valores del formulario
  get form() {
    return this.modTipo.controls;
  }

  //Método para comprobar si es válida la modificación
  onSubmit() {
    this.submitted = true;

    if (this.modTipo.invalid) {
      return;
    }

    this.modificarTipo();
  }

  //Método en el que se crea el que se sobreescriben los valores del objeto de tipo agenda
  modificarTipo() {
    this.tipo_agenda = {
      "id": this.tipo_agenda.id,
      "nombre": this.modTipo.get('nombre').value,
      "codigo": this.modTipo.get('codigo').value,
      "importancia": this.modTipo.get('importancia').value
    }
    this.modificarTipoAgenda();
  }

  // Lanza una petición al servidor para modificar un tipo de agenda.
  modificarTipoAgenda(): void {
    this.cargaTipoAgendaService.modificarTipoAgenda(this.tipo_agenda).subscribe(
      e => {
        this.alertExito();
        this.tipoMod.emit(e);
        this.mostrarEditarTipo.emit(this.mostrar);
        this.idTipo = "";
        this.modTipo.reset();
      },
      error => {
        this.alertError();
      }
    );
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelected(i: number): void {
    document.getElementsByClassName('tipo_agenda_option')[i].setAttribute('selected', '');
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

  //Método para reiniciar los campos del modificar tipo de la agenda
  onReset() {
    this.submitted = false;
    this.modTipo.reset();
    this.mostrarEditarTipo.emit(this.mostrar);
  }
}
