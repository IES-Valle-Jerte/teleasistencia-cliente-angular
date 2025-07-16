import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {CargaHistoricoAgendaService} from "../../../servicios/carga-historico-agenda.service";
import {IHistoricoAgenda} from "../../../interfaces/i-historico-agenda";
import {HistoricoAgenda} from "../../../clases/historico-agenda";
import {IAgenda} from "../../../interfaces/i-agenda";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../servicios/profile.service";

@Component({
  selector: 'app-nuevo-historico-agenda',
  templateUrl: './nuevo-historico-agenda.component.html',
  styleUrls: ['./nuevo-historico-agenda.component.scss']
})
export class NuevoHistoricoAgendaComponent implements OnInit {

  public historico_agenda: IHistoricoAgenda | any;
  public agendas: IAgenda[];
  public agenda: IAgenda;
  public nuevoHistorico: FormGroup;
  public teleoperador: any;
  submitted = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private cargaHistoricoAgenda: CargaHistoricoAgendaService,
    private cargaAgendaService: CargaAgendaService,
    private cargaUserLogued: ProfileService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  // Carga de los datos al cargar el componente
  ngOnInit(): void {

    this.historico_agenda = new HistoricoAgenda();
    this.agendas = this.route.snapshot.data['agendas'];
    this.agenda = this.route.snapshot.data['agenda'];
    this.agenda.fecha_resolucion = new Date();
    this.crearForm();
  }

  obtenerTeleoperador() {
  }

  //Método para obtener los valores del formulario
  get form() {
    return this.nuevoHistorico.controls;
  }

  //Método para comprobar si es válida la modificación
  onSubmit() {
    this.submitted = true;

    if (this.nuevoHistorico.invalid) {
      return;
    }

    this.crearNuevoHistorico();
  }

  crearNuevoHistorico() {
    this.historico_agenda = {
      'id_agenda': this.agenda.id,
      'id_teleoperador': this.teleoperador.id,
      'observaciones': this.nuevoHistorico.get('observaciones_historico').value
    }
    this.nuevoHistoricoAgenda();
  }


  //Petición al servidor para la creación de un nuevo histórico de agenda.
  // A la vez, se llamará a modificarFechaResoluciónAgenda().
  // Esta llamada se hace puesto que al hacer la petición de guardado de un nuevo histórico, queremos a su vez settear
  // la fecha de resolución de dicha agenda para que pase de estar en estado 'no-resuelta' a 'resuelta'.
  nuevoHistoricoAgenda() {
    this.cargaHistoricoAgenda.nuevoHistoricoAgenda(this.historico_agenda).subscribe(
      e => {
        this.modificarFechaResolucionAgenda();
      },
      error => {
        this.alertError();
      }
    );
  }

  // Método que hace petición al servidor para modificar una agenda seleccionada.
  // Esté método se llama de forma automática al crear un histórico de agenda, esto es para actualizar su fecha de resolución
  // de null a la del día actual.
  modificarFechaResolucionAgenda() {
    // @ts-ignore
    this.agenda.id_tipo_agenda = this.agenda.id_tipo_agenda.id;
    this.agenda.id_paciente = this.agenda.id_paciente.id;


    this.cargaAgendaService.modificarAgenda(this.agenda).subscribe(
      e => {
        this.alertExito();
        this.router.navigate(['/agenda']);
      },
      error => {
        this.alertError();
      }
    );
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelected(i: number): void {
    document.getElementsByClassName('agenda_id_option')[i].setAttribute('selected', '');
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

  public crearForm() {
      this.cargaUserLogued.getProfile().subscribe(
      (resp) => {
        this.teleoperador = resp[0];
        this.nuevoHistorico.get("teleoperador").setValue(this.teleoperador.id);
      },
      error => {
        this.alertError();
      });
      var fecha = new Date(this.agenda.fecha_prevista).toISOString().slice(0, 16);
      this.nuevoHistorico = this.formBuilder.group({
        paciente: [this.agenda.id_paciente.id_persona.nombre + " " + this.agenda.id_paciente.id_persona.apellidos + " - " + this.agenda.id_paciente.id_persona.dni,[
          Validators.required
        ]],
        movil_paciente: [this.agenda.id_paciente.id_persona.telefono_movil, [
        ]],
        tipo_agenda: [this.agenda.id_tipo_agenda.nombre, [
          Validators.required
        ]],
        fecha_prevista: [ fecha, [
          Validators.required
        ]],
        observaciones: [this.agenda.observaciones, [
          Validators.required,
          Validators.minLength(10)
        ]],
        agenda: [this.agenda.id + " - " + this.agenda.id_tipo_agenda.nombre, [
          Validators.required
        ]],
        teleoperador: [ '',[
          Validators.required
        ]],
        observaciones_historico: [ '', [
          Validators.required,
          Validators.minLength(10)
        ]]
      })
  }
}
