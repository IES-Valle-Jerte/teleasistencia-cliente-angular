import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-lista-alarmas-resueltas',
  templateUrl: './lista-alarmas-resueltas.component.html',
  styleUrls: ['./lista-alarmas-resueltas.component.scss']
})
export class ListaAlarmasResueltasComponent implements OnInit {
  private teleoperadores: any;
  private idTeleoperador: any;

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.teleoperadores = this.route.snapshot.data['lista-seguimiento-teleoperador'];
    this.idTeleoperador = this.route.snapshot.params['id'];
    this.titleService.setTitle(' Alarmas Resueltas del teleoperador con Id: ' + this.idTeleoperador);
  }

}
