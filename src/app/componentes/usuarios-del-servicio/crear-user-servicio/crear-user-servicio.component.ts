import {Component, Inject, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-crear-user-servicio',
  templateUrl: './crear-user-servicio.component.html',
  styleUrls: ['./crear-user-servicio.component.scss']
})
export class CrearUserServicioComponent implements OnInit {

  public idPaciente: number;
  public mostrar: boolean = true;
  public mostrar2: boolean = false;
  public mostrar3: boolean = false;
  public mostrar4: boolean = false;
  public mostrar5: boolean = false;


pruebas(evento){
  this.mostrar=evento

}
  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Crear usuarios del servicio')
  }

}
