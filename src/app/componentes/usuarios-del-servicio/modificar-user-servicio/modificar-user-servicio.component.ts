import {Component, Inject, OnInit} from '@angular/core';
import {CargaPacienteService} from "../../../servicios/carga-paciente.service";
import {ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-modificar-user-servicio',
  templateUrl: './modificar-user-servicio.component.html',
  styleUrls: ['./modificar-user-servicio.component.scss']
})
export class ModificarUserServicioComponent implements OnInit {

  public urlSite: string;
  public idPaciente: number;
  public mostrar: boolean = true;
  public mostrar2: boolean = false;
  public mostrar3: boolean = false;
  public mostrar4: boolean = false;
  public mostrar5: boolean = false;
  public blockModificar: boolean = false;  //Controla los elementos del modificar aparezcan o desaparezcan en funcion a la url
  public formulariosDesplegados: boolean = true;


  pruebas(evento) {
    this.mostrar = evento
  }

  toggleFormularios() {
    this.formulariosDesplegados = !this.formulariosDesplegados;  //toggle de todos los formularios.

    if (this.formulariosDesplegados) {  //Condicion necesaria para sincronizar los formularios en caso de que alguno este abierto o cerrado de forma individual
      this.mostrar = true;
      this.mostrar2 = true;
      this.mostrar3 = true;
      this.mostrar4 = true;
      this.mostrar5 = true;
    } else {
      this.mostrar = false;
      this.mostrar2 = false;
      this.mostrar3 = false;
      this.mostrar4 = false;
      this.mostrar5 = false;
    }
  }

  generadorIds(): string | null {   //Para evitar conflictos entre el botón de plegar y desplegar y los eventos individuales, comprueba el estado del
                                    // booleano correspondiente al id al que hace referencia y en caso de que sea igual al estado lo añade a un array para que el collapse apunte
                                    // a ese componente
    const idFormularios: string[] = [];

    if (this.mostrar === this.formulariosDesplegados) {
      idFormularios.push('#datosPersonales');
    }

    if (this.mostrar2 === this.formulariosDesplegados) {
      idFormularios.push('#datosSanitarios');
    }

    if (this.mostrar3 === this.formulariosDesplegados) {
      idFormularios.push('#viviendaForm');
    }

    if (this.mostrar4 === this.formulariosDesplegados) {
      idFormularios.push('#personaContacto');
    }

    if (this.mostrar5 === this.formulariosDesplegados) {
      idFormularios.push('#dispositivosForm');
    }

    return idFormularios.length > 0 ? idFormularios.join(', ') : null; // en caso de que el array contenga algún elemento retorna las ids separadas por , en caso de que no tenga retorna null
  }

  toggleIndividual(numCollapse: number) {  // En función del numero de collapse (establecido en la llamada a la función) hace un toggle del booleano de ese formulario
    if (this.blockModificar) {
      switch (numCollapse) {
        case 1:
          this.mostrar = !this.mostrar;
          break;
        case 2:
          this.mostrar2 = !this.mostrar2;
          break;
        case 3:
          this.mostrar3 = !this.mostrar3;
          break;
        case 4:
          this.mostrar4 = !this.mostrar4;
          break;
        case 5:
          this.mostrar5 = !this.mostrar5;
          break;
      }
    }
  }

  CheckArrows() { // en caso de que estemos en el modo informacion pone todas las flechas de los formularios hacia arriba.
    if (this.blockModificar) {
      this.mostrar2 = true;
      this.mostrar3 = true;
      this.mostrar4 = true;
      this.mostrar5 = true;
    }
  }

  constructor(private cargaPacientes: CargaPacienteService, private route: ActivatedRoute, @Inject(DOCUMENT) document: any) {
  }

  ngOnInit(): void {
    this.cargaPacientes.idPacienteEditar = Number(this.route.snapshot.paramMap.get("id"));
    this.urlSite = document.URL //Url de la página para comprobar si esta en el editar o en el consultar.
    this.comprobarUrl()
    this.CheckArrows()


  }

  comprobarUrl() {
    if (this.urlSite.includes("informacion")) {
      this.blockModificar = true;
    } else {
      this.blockModificar = false;
    }
  }
}
