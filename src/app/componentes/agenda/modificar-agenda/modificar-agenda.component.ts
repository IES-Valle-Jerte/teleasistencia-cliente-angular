import { Component, OnInit } from '@angular/core';
import {IAgenda} from "../../../interfaces/i-agenda";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ITipoAgenda} from "../../../interfaces/i-tipo-agenda";
import {IPaciente} from "../../../interfaces/i-paciente";
import {IPersona} from "../../../interfaces/i-persona";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-modificar-agenda',
  templateUrl: './modificar-agenda.component.html',
  styleUrls: ['./modificar-agenda.component.scss']
})
export class ModificarAgendaComponent implements OnInit {

  public agenda: IAgenda;
  public idAgenda: number;
  public tipos_agenda: ITipoAgenda[];
  public tipo_agenda: ITipoAgenda;
  public pacientes: IPaciente[];
  public modAgenda: FormGroup;
  submitted = false;
  guardarCrear = false;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cargaAgendaService: CargaAgendaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  // Carga de los datos al cargar el componente
  ngOnInit(): void {
    this.agenda = this.route.snapshot.data['agenda'];
    this.tipos_agenda = this.route.snapshot.data['tipos_agenda'];
    this.idAgenda = this.route.snapshot.params['id'];
    this.pacientes = this.route.snapshot.data['pacientes'];
    this.titleService.setTitle('Modificar agenda ' + this.idAgenda);
    this.crearForm();
    this.obtenerExpediente();
    this.obtenerImportancia();
  }

  public crearForm() {
    var fecha = new Date(this.agenda.fecha_prevista).toISOString().slice(0, 16);
    if (this.agenda.id_tipo_agenda == null) {
      var tipo: ITipoAgenda = {
        id: this.tipos_agenda[0].id,
        nombre: "",
        codigo: "",
        importancia: ""
      }
      this.agenda.id_tipo_agenda = tipo;
    }
    this.modAgenda = this.formBuilder.group({
      paciente: [this.agenda.id_paciente.id,[
        Validators.required
      ]],
      n_expediente: [this.agenda.id_paciente.n_expediente, [
        Validators.required
      ]],
      tipo_agenda: [this.agenda.id_tipo_agenda.id, [
        Validators.required
      ]],
      importancia: [this.agenda.id_tipo_agenda.importancia, [
        Validators.required
      ]],
      fecha_prevista: [ fecha, [
        Validators.required
      ]],
      observaciones: [this.agenda.observaciones, [
        Validators.required,
        Validators.minLength(10)
      ]]
    })
  }

  // Método que realiza la petición al servidor de modificación de una agenda seleccionada
  modificarEventoAgenda(): void {
    this.cargaAgendaService.modificarAgenda(this.agenda).subscribe(
      e => {
        this.alertExito();
        if (this.guardarCrear) {
          this.router.navigate(['/agenda/nueva' , this.agenda.id_paciente]);
        } else {
          this.router.navigate(['/agenda']);
        }
      },
      error => {
        this.alertError();
      }
    );
    
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelected(i: number): void {
    document.getElementsByClassName('agenda_option')[i].setAttribute('selected', '');
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

  //Método para obtener los valores del formulario
  get form() {
    return this.modAgenda.controls;
  }

  //Método para comprobar si es válida la modificación
  onSubmit() {
    this.submitted = true;

    if (this.modAgenda.invalid) {
      return;
    }

    this.modificarAgenda();
  }

  //Método en el que se crea el que se sobreescriben los valores del objeto de tipo agenda
  modificarAgenda() {
    this.agenda = {
      'id': this.agenda.id,
      'id_paciente': this.modAgenda.get('paciente').value,
      'id_tipo_agenda': this.modAgenda.get('tipo_agenda').value,
      'fecha_registro': this.agenda.fecha_registro,
      'fecha_prevista': this.modAgenda.get('fecha_prevista').value,
      'fecha_resolucion': null,
      'observaciones': this.modAgenda.get('observaciones').value
    }
    this.modificarEventoAgenda();
  }
  
  cambiarNavigate() {
    this.guardarCrear = true;
  }

  //Método para obtener el número de expediente del paciente seleccionado en el formulario
  obtenerExpediente() {
    this.agenda.id_paciente = this.pacientes.find(paciente => paciente.id == this.modAgenda.get('paciente').value);
    this.modAgenda.get('n_expediente').setValue(this.agenda.id_paciente.numero_expediente);
  }

  //Método para obtener la prioridad del tipo de agenda
  obtenerImportancia() {
    this.agenda.id_tipo_agenda = this.tipos_agenda.find(tipo => tipo.id == this.modAgenda.get('tipo_agenda').value);
    this.modAgenda.get('importancia').setValue(this.agenda.id_tipo_agenda.importancia);
  }
}
