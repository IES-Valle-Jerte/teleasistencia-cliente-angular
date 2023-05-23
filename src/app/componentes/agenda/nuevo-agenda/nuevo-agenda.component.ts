import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {IAgenda} from "../../../interfaces/i-agenda";
import {CargaAgendaService} from "../../../servicios/carga-agenda.service";
import {ITipoAgenda} from "../../../interfaces/i-tipo-agenda";
import {IPaciente} from "../../../interfaces/i-paciente";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CargaTipoAgendaService} from "../../../servicios/carga-tipo-agenda.service";

@Component({
  selector: 'app-nuevo-agenda',
  templateUrl: './nuevo-agenda.component.html',
  styleUrls: ['./nuevo-agenda.component.scss']
})
export class NuevoAgendaComponent implements OnInit {

  public agenda: IAgenda | any;
  public tipos_agenda: ITipoAgenda[];
  public tipo_agenda: ITipoAgenda;
  public pacientes: IPaciente[];
  public paciente: IPaciente;
  public nuevaAgenda: FormGroup;
  submitted = false;
  mostrarNuevoTipo = false;
  mostrarEditarTipo = false;
  guardarCrear = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private cargaAgendas: CargaAgendaService,
    private cargaTiposAgendas: CargaTipoAgendaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  // Carga de los datos para poder rellenar el formulario de creación.
  ngOnInit(): void {
    this.tipos_agenda = this.route.snapshot.data['tipos_agenda'];
    this.titleService.setTitle('Nuevo agenda');
    this.pacientes = this.route.snapshot.data['pacientes'];
    this.crearForm();
  }

  public crearForm() {
    this.nuevaAgenda = this.formBuilder.group({
      paciente: ['',[
        Validators.required
      ]],
      n_expediente: ['', [
        Validators.required
      ]],
      tipo_agenda: ['', [
        Validators.required
      ]],
      importancia: ['', [
        Validators.required
      ]],
      fecha_prevista: ['', [
        Validators.required
      ]],
      observaciones: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
    if (this.route.snapshot.paramMap.get('id') != null) {
      let paciente = this.pacientes.find(paciente => paciente.id == Number(this.route.snapshot.paramMap.get('id')));
      if( paciente != undefined) {
        this.nuevaAgenda.get("paciente").setValue(paciente.id_persona.id);
      } else {
        paciente = this.pacientes.find(paciente => paciente.id_persona.id == Number(this.route.snapshot.paramMap.get('id')));
        this.nuevaAgenda.get("paciente").setValue(paciente.id_persona.id);
      }
      this.obtenerExpediente();
    }
  }

  cambiarNavigate() {
    this.guardarCrear = true;
  }

  get form() {
    return this.nuevaAgenda.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.nuevaAgenda.invalid) {
      return;
    }

    this.nuevoAgenda();
  }

  // Método para marcar como 'selected' el option que coincide con el valor de la agenda seleccionada.
  optionSelected(i: number): void {
    document.getElementsByClassName('tipo_agenda_option')[i].setAttribute('selected', '');
  }

  // Método que realiza la petición al servidor de creación de una agenda.
  nuevoAgenda() {
    this.agenda = {
      'id_paciente': this.pacientes.find(paciente => paciente.id_persona.id == this.nuevaAgenda.get('paciente').value).id,
      'id_tipo_agenda': this.nuevaAgenda.get('tipo_agenda').value,
      'fecha_registro': new Date().toISOString().slice(0, 16),
      'fecha_prevista': this.nuevaAgenda.get('fecha_prevista').value,
      'fecha_resolucion': null,
      'observaciones': this.nuevaAgenda.get('observaciones').value
    }
    this.cargaAgendas.nuevoAgenda(this.agenda).subscribe(
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

  //Método mediante el cual se mostrará u ocultará el card de nuevo-tipo-agenda
  mostrarCrear() {
    this.mostrarNuevoTipo = !this.mostrarNuevoTipo;
  }
  //Método mediante el cual se controlará la muestra del card de nuevo-tipo-agenda una vez creado el objeto
  mostrarNuevo(mostrar: boolean) {
    this.mostrarNuevoTipo = mostrar;
  }
  //Método para que una vez creado o modificado el tipo-agenda se seleccione automáticamente en el select del formulario
  cambiarTipo(tipo: ITipoAgenda) {
    this.mostrarNuevoTipo = false;
    this.cargaTiposAgendas.getTiposAgenda().subscribe(
      tipos_agenda => {
        this.tipos_agenda = tipos_agenda;
        this.nuevaAgenda.get('tipo_agenda').setValue(tipo.id);
        this.obtenerImportancia();
        this.alertExito();
      },
      error => {
        this.alertError()
      }
    )
  }

  //Método mediante el cual se mostrará u ocultará el card de detalles-tipo-agenda
  mostrarModificar() {
    this.mostrarEditarTipo = !this.mostrarEditarTipo;
  }
  //Método mediante el cual se controlará la muestra del card de detalles-tipo-agenda una vez modificado el objeto
  mostrarMod(mostrar: boolean) {
    this.mostrarEditarTipo = mostrar;
  }

  //Método para eliminar el objeto tipo-agenda seleccionado en el select del formulario
  eliminarTipo() {
    this.cargaTiposAgendas.borrarTipoAgenda(this.nuevaAgenda.get('tipo_agenda').value).subscribe(
      () => {},
      error => {
        this.alertError();
      },
      () => this.cargaTiposAgendas.getTiposAgenda().subscribe(
        tipos_agenda => {
          this.tipos_agenda = tipos_agenda;
          this.nuevaAgenda.get('tipo_agenda').setValue('');
          this.nuevaAgenda.get('importancia').setValue('');
          this.alertExito();
        },
        error => {
          this.alertError();
        }
      )
    )
  }

  //Método para obtener el número de expediente del paciente seleccionado en el formulario
  obtenerExpediente() {
    this.paciente = this.pacientes.find(paciente => paciente.id_persona.id == this.nuevaAgenda.get('paciente').value);
    this.nuevaAgenda.get('n_expediente').setValue(this.paciente.numero_expediente);
  }

  //Método para obtener la prioridad del tipo de agenda
  obtenerImportancia() {
    this.tipo_agenda = this.tipos_agenda.find(tipo => tipo.id == this.nuevaAgenda.get('tipo_agenda').value);
    this.nuevaAgenda.get('importancia').setValue(this.tipo_agenda.importancia);
  }

  //Funcion para deshabilitar botones (EDITAR Y BORRAR TIPO AGENDA)
  botonDes(){
    if((this.nuevaAgenda.get("tipo_agenda").value == '')||(this.nuevaAgenda.get("tipo_agenda").value == null)){
      return true;
    }else{
      return false;
    }
  }
}
