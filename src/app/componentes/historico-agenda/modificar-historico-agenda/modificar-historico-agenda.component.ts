import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IHistoricoAgenda} from "../../../interfaces/i-historico-agenda";
import {IAgenda} from "../../../interfaces/i-agenda";
import {CargaHistoricoAgendaService} from "../../../servicios/carga-historico-agenda.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {ProfileService} from "../../../servicios/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProfileUser} from "../../../interfaces/i-profile-user";
import {IPaciente} from "../../../interfaces/i-paciente";
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {CargaPersonaService} from "../../../servicios/carga-persona.service";


@Component({
  selector: 'app-modificar-historico-agenda',
  templateUrl: './modificar-historico-agenda.component.html',
  styleUrls: ['./modificar-historico-agenda.component.scss']
})
export class ModificarHistoricoAgendaComponent implements OnInit {

  public historico_agenda: IHistoricoAgenda;
  public id_historico_agenda: number;
  public agendas: IAgenda[];
  public teleoperadores: any[];
  public datosAgenda: FormGroup;
  public paciente: IPaciente | any;
  public teleoperador: any;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private cargaHistoricoAgenda: CargaHistoricoAgendaService,
    private cargaAgendaService: CargaAgendaService,
    private cargaPersona: CargaPersonaService,
    private cargaUserLogued: ProfileService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  // Carga de los datos necesarios al cargar el componente.
  ngOnInit(): void {
    this.historico_agenda = this.route.snapshot.data['historico_agenda'];
    this.id_historico_agenda = this.route.snapshot.params['id'];
    this.agendas = this.route.snapshot.data['agendas'];
    this.teleoperador = this.historico_agenda.id_teleoperador;
    this.paciente = this.historico_agenda.id_agenda.id_paciente;
    this.crearForm();
  }

  get form() {
    return this.datosAgenda.controls;
  }

  // Petición al servidor para modificar un histórico de agenda seleccionado
  modificarHistoricoDeAgenda(): void {
    this.cargaHistoricoAgenda.modificarHistoricoAgenda(this.historico_agenda).subscribe(
      e => {
        this.alertExito();
        this.router.navigate(['/historico_agenda']);
      },
      error => {
        this.alertError();
      }
    );
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelected(i: number): void {
    document.getElementsByClassName('historico_agenda_option')[i].setAttribute('selected', '');
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelectedTeleoperador(i: number): void {
    document.getElementsByClassName('historico_agenda_option_teleoperador')[i].setAttribute('selected', '');
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

  private crearForm() {
    this.cargaPersona.getPersona(this.paciente.id_persona).subscribe(
      pers => {
        this.paciente = pers;
        this.datosAgenda.get('paciente').setValue(this.paciente.nombre + ' ' + this.paciente.apellidos + " " + this.paciente.dni);
        this.datosAgenda.get("movil_paciente").setValue(this.paciente.telefono_movil);
      },
      error => {
        this.alertError();
      }
    );
    this.datosAgenda = this.formBuilder.group({
      paciente: [ '',[
        Validators.required
      ]],
      movil_paciente: [ '', [
        Validators.required
      ]],
      tipo_agenda: [this.historico_agenda.id_agenda.id_tipo_agenda.nombre, [
        Validators.required
      ]],
      fecha_prevista: [ this.historico_agenda.id_agenda.fecha_prevista.slice(0, 16), [
        Validators.required
      ]],
      observaciones: [this.historico_agenda.id_agenda.observaciones, [
        Validators.required,
        Validators.minLength(10)
      ]],
      agenda: [this.historico_agenda.id_agenda.id + " - " + this.historico_agenda.id_agenda.id_tipo_agenda.nombre, [
        Validators.required
      ]],
      teleoperador: [ this.teleoperador.first_name + " " + this.teleoperador.last_name,[
        Validators.required
      ]],
      fecha_llamada: [ this.historico_agenda.id_agenda.fecha_registro.slice(0, 16), [
        Validators.required
      ]],
      observaciones_historico: [ this.historico_agenda.observaciones, [
        Validators.required,
        Validators.minLength(10)
      ]]
    })
  }
}
